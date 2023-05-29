const mongoose = require("mongoose")

const taskSchema = mongoose.Schema({

    name:{
        type: String,
        required: true,
        trim: true
    },
    state: {
        type: Boolean,
        default: false

    },

    register:{
        type: Date,
        default: Date.now()

    },

    projectId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "project"

    }


})

module.exports = mongoose.model("task", taskSchema)