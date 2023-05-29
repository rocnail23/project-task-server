const mongoose = require("mongoose")


const connect = async () => {
try {
    mongoose.connect(process.env.MG_DB,{
        useNewUrlParser: true,
        useUnifiedTopology: true
        })

    console.log("database connect")
} catch (error) {
    console.log(error)
}


}



module.exports  = connect