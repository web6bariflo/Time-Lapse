import dotenv from 'dotenv'
import mongoose from 'mongoose'

dotenv.config()
const URI = process.env.MONGODB_URI

const connectDb = async()=>{
    try {
        await mongoose.connect(URI);
        console.log("connected to Database");
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}

export default connectDb

