const mongoose = require('mongoose')

function roundToMinute(date) {
    const d = new Date(date)
    d.setSeconds(0, 0)
    return d
}


const deviceDataSchema = mongoose.Schema({
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
        set: roundToMinute
    },


    TimestampFull: {
        type: Date,
        default: Date.now
    },

    // V: {
    //     type: Number,
    //     default: 0,
    // },

    // A: {
    //     type: Number,
    //     default: 0,
    // },

    KWH: {
        type: Number,
        default: 0,
    },

    // KW: {
    //     type: Number,
    //     default: 0,
    // },

    // KVARH: {
    //     type: Number,
    //     default: 0,
    // },

    COSPHI: {
        type: Number,
        default: 0
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

deviceDataSchema.index(
  { Site: 1, Station: 1, Device: 1, Timestamp: 1 },
  { unique: true }
);

const DeviceData = mongoose.model('DeviceData', deviceDataSchema, 'device_data')

module.exports = DeviceData
