import {ZodError} from "zod";
const validate=(schema)=> async(req,res,next)=>{
    console.log("REQ BODY >>>", req.body);
    try{
    const parseBody=await schema.parseAsync(req.body);
    req.body=parseBody;
    next();
    }
    catch(err) {
        console.log("ZOD ERROR >>>", err);
        // If it's a Zod validation error
        if (err instanceof ZodError) {
          // Extract the first error message (you can return all if needed)
          const firstMessage = err.issues?.[0]?.message || "Invalid input data";
          const issue = err.issues?.[0]; // first issue
          const field = issue?.path?.[0]
          /* Return a clean single message response
             return res.status(400).json({
             success: false,
             message: firstMessage,
          */
        //  Error handle by Global error handlers return next()
         const errorobj={
            status:400,
            message:firstMessage,
            extraDetails:field,
         }
          return next(errorobj);//
}}}
export default validate; 