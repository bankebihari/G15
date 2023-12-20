
 import mongoose from "mongoose"
const  connectdatabase=async()=>{
    try {
        const data=await mongoose.connect('mongodb+srv://bankebihari1206:Banke@#$123@cluster0.tffddqx.mongodb.net');
        console.log(`mongodb is connected ${data.connection.host}`)
        
        
    } catch (error) {
        console.log(`ERROR IN MONGODB ${error}`)
        
    }

}
export default connectdatabase