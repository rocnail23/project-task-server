const User = require("../models/UserModel")
const bcryptjs = require("bcryptjs")
const jwt = require("jsonwebtoken")
const {validationResult} = require("express-validator")



exports.createUser = async (req,res) => {

    let error = validationResult(req)
    if(!error.isEmpty()){
       return res.json({error: error.array()})
    }


    const {password,email} = req.body
    try {
        let user;

    user = await User.findOne({email:email })
    if(user){
       return res.status(400).json({mgs: "ya hay un usuario registrado con ese correo"})
    }    
    user =  await   new User(req.body)
    let salt = await bcryptjs.genSalt()

    user.password = await bcryptjs.hash(password, salt)
    user = await user.save()
        
    const payload = {
        id: user.id
    }

    const token = jwt.sign(payload,process.env.SECRET,{
        expiresIn: 6800
    })

    

    res.json({token})
    } catch (error) {
        res.status(400).json({mgs: "error " + error })
    }



}