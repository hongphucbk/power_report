const mongoose = require('mongoose')

const deviceSchema = mongoose.Schema({
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


    TimestampFull: {
        type: Date,
        default: Date.now
    },

    IsActive: {
        type: Number,
        default: 1,
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

deviceSchema.index(
  { Site: 1, Station: 1, Device: 1 },
  { unique: true }
);

const Device = mongoose.model('Device', deviceSchema, 'device')

module.exports = Device
