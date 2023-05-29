const Project = require("../models/ProjectModel")
const {validationResult} = require("express-validator")


exports.createProject = async (req, res) => {
    let error = validationResult(req)
    if(!error.isEmpty){
        return res.json({error: error.array()})
    }

    try {
        let project;
        project = await new Project(req.body)
        project.owner = req.owner
        project = await project.save()

        res.json({project}) 
    
    } catch (error) {
        
    }

}


exports.getAllProject =  async (req,res) => {
try {
    let projects = await Project.find({owner:req.owner})
    if(!projects){
        return res.status(404).json({mgs: "proyectos no encontrados"})
    }

    res.json(projects)

} catch (error) {
    
    res.json({error})
}
}

exports.editById = async (req, res) => {
    let error = validationResult(req)
    if(!error.isEmpty){
        return res.json({error: error.array()})
    }
    
    try {
        const  {name} = req.body
        let edit = {name}
        let project;
        project = await Project.findById(req.params.id)
        if(!project){
            return res.json({mgs: "proyecto no encontrado"})
        }
       
        if(project.owner.toString() != req.owner){
            return res.json({mgs: "token no coincide con el owner"})
        }

        editProyect = await Project.findByIdAndUpdate(req.params.id,edit)
        res.json({mgs: "objeto actualizado"})


    } catch (error) {
        console.log(error)
    }

}

exports.deleteById = async (req, res) => {
try {
    let project;
    project = await Project.findById(req.params.id)
    if(!project){
        return res.json({mgs: "proyecto no encontrado"})
    }
    
    if(project.owner.toString() != req.owner){
        return res.json({mgs: "token no coincide con el owner"})
    }

    await Project.findByIdAndDelete(req.params.id)
    return res.json({mgs: "projecto eliminado"})
} catch (error) {
    
}

}