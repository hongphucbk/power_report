const mongoose = require('mongoose')

function roundToDay(date) {
    const d = new Date(date)
    d.setHours(0, 0, 0, 0) // reset về 00:00:00
    return d
}


const deviceKwhSchema = mongoose.Schema({
    Site: {
        type: String,
        required: true,
        trim: true,
    },
    Station: {
        type: String,
        trim: true,
    },
    Device: {
        type: String,
        trim: true,
    },

    Timestamp: {
        type: Date,
        default: Date.now,
        set: roundToDay
    },


    TimestampFull: {
        type: Date,
        default: Date.now
    },


    KWH: {
        type: Number,
        default: 0,
    },

    KWH_MIN: {
        type: Number,
        default: 0,
    },

    KWH_MAX: {
        type: Number,
        default: 0,
    },

    UpdatedAt: {
        type: Date,
        default: Date.now

    },

    CreatedAt: {
        type: Date,
        default: Date.now

    },

    

    //device: {type: mongoose.Schema.Types.ObjectId, ref: 'Device' },
    //station: {type: mongoose.Schema.Types.ObjectId, ref: 'Station' },
    // password: {
    //     type: String,
    //     required: true,
    //     minLength: 5
    // },
    // tokens: [{
    //     token: {
    //         type: String,
    //         required: true
    //     }
    // }]
})

deviceKwhSchema.index(
  { Site: 1, Station: 1, Device: 1, Timestamp: 1 },
  { unique: true }
);

const DeviceKwh = mongoose.model('DeviceKwh', deviceKwhSchema, 'device_kwh')

module.exports = DeviceKwh
