const express = require("express")
const authController = require("../controllers/AuthController")
const router = express.Router()
const {check } = require("express-validator")

router.post("/",
[
    check("email", "el email es necesario").notEmpty(),
    check("password", "la contraseña es necesaria").notEmpty()
],
authController.authUser)




module.exports = router 