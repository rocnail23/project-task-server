const express = require("express")
const router = express.Router()
const auth = require("../middleware/authMiddle")
const {check} = require("express-validator")
const taskController = require("../controllers/taskController")


router.post("/",
auth,
[
    check("name", "nombre es requerido").notEmpty()    
],
taskController.createTask
)

router.get("/:id",  auth, taskController.getTaskPerProject)

router.put("/", auth,
[
    check("name", "el nombre es necesario").notEmpty(),
    check("_id", "el id es necesario").notEmpty(),
    check("projectId", "el id del pryecto es nesario").notEmpty()
],
taskController.editTask)

router.delete("/:id", auth, taskController.deleteById)

module.exports = router