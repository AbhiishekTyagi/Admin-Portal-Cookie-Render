import express from "express";
import router  from "./router/auth-router.js";
import adminrouter from "./router/admin-router.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDB from "./utils/db.js";
import errorMiddleware from "./middlewares/error-middlewares.js";
const app=express();
const port =process.env.Port;

// Handling the cors issues
const corsOptions = {
    origin: "https://admin-portal-cookie-vercel-gxtv.vercel.app/",
    method: ["GET", "POST", "PUT", "DELETE", "PATCH", "HEAD"],
    credentials: true,
  };
app.use(cors(corsOptions));

//Without this → req.cookies will be undefined.
app.use(cookieParser());


//Using middleware to pass data in JSON format 
app.use(express.json());

//Mount the router
app.use("/api/users",router);

//Mount the admin router
app.use("/api/admin",adminrouter);


// Using the error Handling middleware mount using the use() method
app.use(errorMiddleware);


//Start the server
connectDB().then(()=>
{
app.listen(port,()=>{
    console.log(`Server is running on ${port}`);
})
});