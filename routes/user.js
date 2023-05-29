const express = require("express")
const router = express.Router()
const controller = require("../controllers/userController")
const {check} = require("express-validator")


router.post("/",
[
    check("name", "nombre requerido").notEmpty(),
    check("email", "email requerido").isEmail(),
    check("password", "password requerida").isLength({min:6})
]
,controller.createUser)


module.exports = router