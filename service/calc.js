require('dotenv').config();
const job = require('cron').CronJob;
var moment = require('moment');
var mongoose = require('mongoose');
//-------------------------------------------------------------------
mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false});

//---------------------------------------------------------------
// Defind model
const DeviceData = require('../models/DeviceData')
const Device = require('../models/Device')
const DeviceKwh = require('../models/DeviceKwh')

//---------------------------------------------------------------

async function syncDevice() {
    // 1. Lấy 100 record mới nhất
    const devices = await DeviceData.aggregate([
        {
            $sort: { TimestampFull: -1 }
        },
        {
            $limit: 200
        },
        {
            $match: {
                Device: { $ne: null, $ne: "" }
            }
        },
        {
            $group: {
                _id: {
                    Site: "$Site",
                    Station: "$Station",
                    Device: "$Device"
                },
                lastSeen: { $max: "$TimestampFull" }
            }
        }
    ])

    if (!devices.length) return []

    // 2. bulkWrite (nhanh hơn loop nhiều lần)
    const ops = devices.map(d => ({
        updateOne: {
            filter: {
                Site: d._id.Site,
                Station: d._id.Station,
                Device: d._id.Device
            },
            update: {
                $set: {
                    TimestampFull: d.lastSeen,
                    UpdatedAt: new Date(),
                    IsActive: 1
                },
                $setOnInsert: {
                    CreatedAt: new Date()
                }
            },
            upsert: true
        }
    }))

    const result = await Device.bulkWrite(ops)

    return result
}

async function calcAndSaveKwh(inDate) {
    let dateInput = moment(inDate).subtract(1, 'hours')

    const start = moment(dateInput).startOf('day').toDate()
    const end = moment(dateInput).endOf('day').toDate()

    // 1. Tính toán từ device_data
    const data = await DeviceData.aggregate([
        {
          $match: {
              Timestamp: { $gte: start, $lte: end },
              Device: { $ne: null, $ne: "" }
          }
        },
        {
          $sort: { Timestamp: 1 } // 🔥 bắt buộc
        },
        {
          $group: {
              _id: {
                  Site: "$Site",
                  Station: "$Station",
                  Device: "$Device"
              },
              firstKwh: { $first: "$KWH" },
              lastKwh: { $last: "$KWH" },
              firstTime: { $first: "$Timestamp" },
              lastTime: { $last: "$Timestamp" }
          }
        },
        {
          $project: {
              _id: 0,
              Site: "$_id.Site",
              Station: "$_id.Station",
              Device: "$_id.Device",

              Timestamp: start, // sẽ auto round về 00:00
              TimestampFull: "$lastTime",

              KWH_MIN: "$firstKwh",
              KWH_MAX: "$lastKwh",

              KWH: {
                  $cond: [
                      { $gte: ["$lastKwh", "$firstKwh"] },
                      { $subtract: ["$lastKwh", "$firstKwh"] },
                      0
                  ]
              }
          }
        }
    ])

    if (!data.length) return []

    // 2. bulkWrite vào device_kwh
    const ops = data.map(item => ({
        updateOne: {
            filter: {
                Site: item.Site,
                Station: item.Station,
                Device: item.Device,
                Timestamp: item.Timestamp
            },
            update: {
                $set: {
                    KWH: item.KWH,
                    KWH_MIN: item.KWH_MIN,
                    KWH_MAX: item.KWH_MAX,
                    TimestampFull: item.TimestampFull,
                    UpdatedAt: new Date()
                },
                $setOnInsert: {
                    CreatedAt: new Date()
                }
            },
            upsert: true
        }
    }))

    const result = await DeviceKwh.bulkWrite(ops)

    return result
}




//===========

//Every 1h
var jobE1h = new job('*/20  * * * *', async function() {
  await syncDevice()
  await calcAndSaveKwh(moment())

}, null, true, 'Asia/Ho_Chi_Minh');

jobE1h.start()







