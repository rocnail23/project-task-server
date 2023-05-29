const express = require("express")
const router = express.Router()
const projectController = require("../controllers/projectController")
const auth = require("../middleware/authMiddle")
const { check } = require("express-validator")

router.post("/",
    auth,

    [
        check("name", "el nombre es necesario").notEmpty()
    ]
    ,
    projectController.createProject)

router.get("/", auth, projectController.getAllProject)

router.put("/:id", auth,
    [
        check("name", "requiere nombre").notEmpty
    ],
    projectController.editById)


router.delete("/:id",
auth
,
projectController.deleteById)    


module.exports = router
