const mongoose = require("mongoose")

const userSchema = mongoose.Schema({

    name:{
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true,
        trim: true
    },

    register:{
        type: Date,
        default: Date.now()
    }



})

module.exports = mongoose.model("user", userSchema)