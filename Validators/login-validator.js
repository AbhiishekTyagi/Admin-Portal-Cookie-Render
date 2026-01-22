import {z} from "zod";
const loginSchema=z.object({
  
    email:z
    .string({required_error:"Email is required"})
    .trim()
    .email({message:"Email address is missing"})
    .min(3,{message:"Email must be at least 3 character"})
    .max(255,{message:"Email must not be more then 255 character"}),

    password:z
    .string({required_error:"Password is required"})
    .min(7,{message:"Password must be at least 7 characters"})
    .max(1024,{message:"Password can not  be more then 1024 characters"}),
});
export default loginSchema;