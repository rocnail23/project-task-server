const User = require("../models/UserModel")
const jwt = require("jsonwebtoken")
const bcryptjs = require("bcryptjs")
const {validationResult} = require("express-validator")



exports.authUser = async( req, res) => {

    let error = validationResult(req)
    if(!error.isEmpty()){
        return res.status(400).json({error: error.array()})
    }

   const {email,password} = req.body


    try {
        
        let user;
        console.log(user)
        user = await User.findOne({email: email})
       
        if(!user){
            return res.status(400).json({mgs: "correo no encotrado"})
        }
        
        let isPassword = await bcryptjs.compare(password,user.password)
        
        if(!isPassword){
            return res.status(400).json({mgs: "Las contraseñas no coinciden"})
        }

        let payload = {
            id: user.id
        }
       
        let token = jwt.sign(payload, process.env.SECRET,{
            expiresIn: 9600
        })

       
        res.json({token})
    } catch (error) {
        res.status(400).json(error)
    }

}



exports.getAuthUser = async(req,res) => {    


    try {
        let user = await  User.findById(req.owner).select("-password")
        console.log(user)
        res.json({user})
    } catch (error) {
        res.json({mgs: "ha habido un error", error})
    }


}
