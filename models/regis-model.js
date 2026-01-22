import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

//Define the Schema here
const userSchema=new mongoose.Schema({

    username:{
        type: String,
        required:true,
    },
    email:{
        type: String,
        required:true,
        unique:true,
    },
    phone:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
         type:String,
         required:true,
    },
    isAdmin:{
        type:Boolean,
        default:false,
    },
});

//Secure the password  with the bcrypt
userSchema.pre("save",async function(){
    const user=this;
    if(!user.isModified("password"))
    {
        next(); // move to the next middleware or route handlers
    }
    try{
    const saltRound=await bcrypt.genSalt(10);
    const hash_password=await bcrypt.hash(user.password,saltRound);
    user.password=  hash_password;
    }
    catch(error)
    {
        next(error);
    }
});

//Instance  method for  JWT(JSON Web Token)
userSchema.methods.generateToken=async function(){
    try{
       return jwt.sign(
         {
            userId:this._id.toString(),
            email:this.email,
            isAdmin:this.isAdmin,
         },
         process.env.JWT_SECRET_KEY,
         {
            expiresIn:"30d",
         }
       );
    }
    catch(error)
    {
        console.error(error);
    }
};
//Instance method for Compare the password
userSchema.methods.comparePassword=async function(pass){
    return bcrypt.compare(pass,this.password);
};

//Define the collections or model name
const User=new mongoose.model("User",userSchema);
export default User;