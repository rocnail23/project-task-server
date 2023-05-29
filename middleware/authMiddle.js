const jsw = require("jsonwebtoken")

const authMiddleware = async (req, res, next) => {

   let  token; 
   token = req.header("x-auth-token")
   if(!token){
    return res.json({mgs: "falta el token"})
   }
    
   

    
    try {

        let dataToken = jsw.verify(token, process.env.SECRET)

        req.owner = dataToken.id
        
        next()

    } catch (error) {
        res.json({mgs: "token invalido " + error})
    }


}

module.exports = authMiddleware