const Project = require("../models/ProjectModel")
const Task = require("../models/TaskModel")
const {validationResult} = require("express-validator")

exports.createTask = async (req,res) => {

    let error = validationResult(req)
    if(!error.isEmpty()){
       return res.json({error: error.array()})
    }

    try {
        const {projectId} = req.body
        let task;
        let project = await Project.findById(projectId)

        if(!project){
            return res.json({mgs: "proyecto no encontrado"})
        }

        if(project.owner.toString() != req.owner){
            return res.json({mgs: "token no coincide con el owner"})
        }

        task = new Task(req.body)
        task = await task.save()

        res.json({task})

        
    } catch (error) {
        
    }


}