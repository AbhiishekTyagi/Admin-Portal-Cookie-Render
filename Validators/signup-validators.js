import {z} from "zod";

// Creating a object Schema
const signupSchema=z.object({

    username:z
    .string({required_error:"Name is required"})
    .trim()
    .min(3,{message:"Name must be at least 3 character"})
    .max(255,{message:"Name must not be more then 255 character"}),
    
    email:z
    .string({required_error:"Email is required"})
    .trim()
    .email({message:"Invalid email address"})
    .min(3,{message:"Email must be at least 3 character"})
    .max(255,{message:"Email must not be more then 255 character"}),

    phone:z
    .string({required_error:"Phone is required"})
    .trim()
    .min(10,{message:"Phone must be at least of 10 character"})
    .max(20,{message:"Phone must not be more then 20 character"}),

    password:z
    .string({required_error:"Password is required"})
    .min(7,{message:"Password must be at least 7 characters"})
    .max(1024,{message:"Password can not  be more then 1024 characters"}),
});

export default signupSchema;