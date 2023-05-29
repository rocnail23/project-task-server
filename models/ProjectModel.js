const mongoose = require("mongoose")


const ProjectSchema = mongoose.Schema({

    name:{
        type: String,
        required: true,
        trim: true,
    },

    owner:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true,
        trim: true
    },

    register: {
        type: Date,
        default: Date.now()
    }

})

module.exports = mongoose.model("project", ProjectSchema)