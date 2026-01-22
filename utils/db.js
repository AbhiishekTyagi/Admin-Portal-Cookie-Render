import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

// const URI="mongodb://127.0.0.1:27017/mern_admin";
const URI=process.env.MONGODB_URI;

const connectDB= async()=>{
    try{
     await mongoose.connect(URI);
     console.log("Connections Successful to DB");
    }
    catch(error)
    {
      console.error("DataBase Connection failed");
      process.exit(0);
    }
};
export default connectDB;