import mongoose from 'mongoose'
import 'dotenv/config'
async function conectarBD() {
    try{
        console.log(process.env.SECRET_MONGO)
        const respuestaMongo = await mongoose.connect("mongodb+srv://bartoloruizisai:2006Bar16@cluster0.mvzustx.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
        //mongoose.connect("mongodb://Localhost:27017/backend1")
        console.log("Conectado a MongoDB Atlas")
    }
    catch(err){
        console.log("Error de conexion a la BD" + err)
    }
}
export default conectarBD