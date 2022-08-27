const mongoose = require('mongoose');
const validator = require('email-validator')

const rationSchema = new mongoose.Schema( {
    food: { required:true,
        type:String
    },
        water: { required:true,
        type:String 
    },
       scheduleTitle: {
            type:String,
            required:true
        },
        email: {
            required:true,
            unique:true,
            type:String
        },
        password:
            { required:true,
            type:String
        }
}, { timestamps: true });

module.exports = mongoose.model('Rations', rationSchema)



