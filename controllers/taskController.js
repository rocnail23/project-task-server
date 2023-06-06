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

        res.json(task)

        
    } catch (error) {
        
    }


}

exports.getTaskPerProject = async( req, res) => {

 

    try {
       
        const {id} = req.params
        
        let tasks;

        let project = await Project.findById(id)

        if(!project){
            return res.json({mgs: "proyecto no encontrado"})
        }

        if(project.owner.toString() != req.owner){
            return res.json({mgs: "token no coincide con el owner"})
        }

        tasks = await Task.find({projectId: id})
        if(!tasks){
            return res.json({mgs:" no se encontraron tareas"})
        }

        res.json(tasks)


        
    } catch (error) {
        res.status(400).json({mgs: error})
    }


}



exports.editTask = async (req, res) => {

    let error = validationResult(req)
    if(!error.isEmpty()){
       return res.json({error: error.array()})
    }

    try {

        const{_id,projectId,name,state} = req.body

        let project = await Project.findById(projectId)

        if(!project){
            return res.json({mgs: "proyecto no encontrado"})
        }

        if(project.owner.toString() != req.owner){
            return res.json({mgs: "token no coincide con el owner"})
        }

        let task = await Task.findById(_id)

        if(!task){
            return res.json({mgs:"task no encontrada"})
        } 

        task.name = name
        task.state = state
        task = await Task.findByIdAndUpdate(_id, task)

        res.json({mgs: "tarea actualizada"})

    } catch (error) {
        res.json({mgs: error})
    }

}

exports.deleteById = async(req, res) => {

    let error = validationResult(req)
    if(!error.isEmpty()){
       return res.json({error: error.array()})
    }



    try {

        const {id} = req.params
        let task;

        task = await  Task.findById(id)
        if(!task){
            res.json({mgs: "task no encontrada"})
        }

       await Task.findByIdAndDelete(id)

        res.json({mgs:"proyecto eliminado"})
       
        
    } catch (error) {
        res.json({mgs: error})
    }


}

