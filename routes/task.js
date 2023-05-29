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

module.exports = router