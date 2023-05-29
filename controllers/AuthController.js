const User = require("../models/UserModel")
const jwt = require("jsonwebtoken")
const bcryptjs = require("bcryptjs")
const {validationResult} = require("express-validator")
exports.authUser = async( req, res) => {

    let error = validationResult(req)
    if(!error.isEmpty()){
        return res.json({error: error.array()})
    }

   const {email,password} = req.body


    try {
        let user;
        user = await User.findOne({email: email})
        if(!user){
            return res.json({mgs: "correo no encotrado"})
        }
        
        
        
        if(!bcryptjs.compare(password,user.password)){
            return res.json({mgs: "Las contraseñas no coinciden"})
        }

        let payload = {
            id: user.id
        }
       
        let token = jwt.sign(payload, process.env.SECRET,{
            expiresIn: 9600
        })

       
        res.json({token})
    } catch (error) {
        res.send(error)
    }

}