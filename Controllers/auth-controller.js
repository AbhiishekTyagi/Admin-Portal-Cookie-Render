import User from "../models/regis-model.js";
import Contact from "../models/contact-model.js";
import service from "../models/service-model.js"; 
import Session from "../models/session-model.js";

//1. Home Logic
const home=async(req,res)=>{
    try{
        res.status(200).send("Server is running  fine on router!!!");
    }
    catch(error)
    {
        console.log(error);
    }
}

//2. Registration Route Logic
const register=async(req,res,next)=>{
    try{
        //console.log(req.body);
        //Destructuring the req.body object
        const { username, email, phone, password}=req.body;
        //Check the email is already exist or not in the database
        const usernameexit=await User.findOne({username:username});
        const userExist=await User.findOne({email:email});
        const mobileno=await User.findOne({phone:phone});
        if(usernameexit)
          {
          //  return res.status(400).json({msg:"Email already exists"});
          const error={
           status:400,
           message:"Username already taken",
         }
          next(error);
          }
        if(userExist)
        {
        //  return res.status(400).json({msg:"Email already exists"});
        const error={
         status:400,
         message:"Email already exists",
       }
        next(error);
        }
        if(mobileno)
          {
          //  return res.status(400).json({msg:"Email already exists"});
          const error={
           status:400,
           message:"Phone Number Already exits",
         }
          next(error);
          }
        // const saltround=10;
        // const hash_password=await bcrypt.hash(password,saltround);
        const usercreated=await User.create({ 
            username,
            email,
            phone,
            password,
        });
        //Generate the token with the intance method
        const token=await usercreated.generateToken();
        // Send JWT as cookie
       res.cookie("accessToken", token, {
       httpOnly: true,
       secure: process.env.NODE_ENV === "production",
       sameSite: "strict",
       maxAge: 15 * 60 * 1000, // 15 minutes
       path: "/",
        });

        res.status(201).json(
            {
             msg:"Registration Successful",
             //Calling the instance method  for generateToken()
            //  token:await usercreated.generateToken(),
             userId:usercreated._id.toString(),
            }
        ); 
    }
    catch(error)
    {
    //res.status(500).json({msg:"Internal Server Error"});
    const message="Internal Server Error";
    const err={
     message,
   }
    next(err);
    }
}

// //3. Login Route Logic (localStorage based)
// const login=async(req,res,next)=>{
//     try{
//       // Destructuring the body
//       const{email,password}=req.body;
//       //Check the email is already exist or not in the database
//       const userExit= await User.findOne({email});
//       //Print the corresponding email document on the screen
//       console.log(userExit);
//       if(!userExit)
//       {
//         // return res.status(400).json({mess:"Firstly Done the Registration then try to Login"});
//        const status=400;
//        const message="Firstly Done the Registration then try to Login";
//        const error={
//          status,
//          message,
//        }
//         next(error);
//       }

//     // Direct calling the compare() from bcrypt pakage without using instance method bcrypt.compare() return true if password match
//     // const user=await bcrypt.compare(password,userExit.password);
       
//        //password come through req.body (Destucturing above) 
       
//       //Calling the instance method for comparePassword()
//       const user=await userExit.comparePassword(password);
//       if(user)
//       {
//         const token=await userExit.generateToken();
        
//        //CREATE SESSION HERE when user try to login
//        //This line create a document in the session Collection
//        await Session.create({
//         userId: userExit._id,
//         token: token,
//       });
//       //SEND TOKEN AS COOKIE (NEW PART)
//       res.cookie("accessToken", token, {
//       httpOnly: true,
//       secure: process.env.NODE_ENV === "production",
//       sameSite: "strict",
//       maxAge: 15 * 60 * 1000, // 15 minutes
//       path: "/",
//       });

//     res.status(200).json({
//            mssg:"Login Successfull",
//            //Calling the instance method  for generateToken()
//           //  token: token,
//            user_id:userExit.id.toString(), 
//         });
//       }
//       else
//       {
//         // res.status(401).json({message:"Invalid email or Password"});
//         const status=401;
//         const message="Incorrect Password";
//         const extraDetails="You enter password is incorrect check the password carefully"; 
//         const error=
//         {
//           status,
//           message,
//           extraDetails,
//         }
//         next(error);
//       }
//     }
//     catch(error)
//     {
//         // res.status(500).json({mess:"Internal Server Error"});
//         const message="Internal Server Error";
//         const err={
//          message,
//        }
//         next(err);
//     }
// }
// 3. Login Route Logic (COOKIE BASED)
const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // 1️⃣ Check user exists
    const userExit = await User.findOne({ email });
    if (!userExit) {
      return next({
        status: 400,
        message: "Firstly do the registration then try to login",
      });
    }

    // 2️⃣ Compare password
    const isMatch = await userExit.comparePassword(password);
    if (!isMatch) {
      return next({
        status: 401,
        message: "Incorrect Password",
        extraDetails: "You entered password is incorrect",
      });
    }

    // 3️⃣ Generate JWT
    const token = await userExit.generateToken();

    // 4️⃣ Create active session
    await Session.create({
      userId: userExit._id,
      token: token,
      isActive: true,
    });

    // 5️⃣ Send JWT as HttpOnly cookie
    res.cookie("accessToken", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 15 * 60 * 1000, // 15 minutes
      path: "/",
    });

    // 6️⃣ Response (NO token in body)
    res.status(200).json({
      message: "Login Successful",
      user_id: userExit._id.toString(),
    });

  } catch (error) {
    next({
      status: 500,
      message: "Internal Server Error",
    });
  }
};

// 4.Create Contact Route logic
const contactForm=async (req,res,next)=>{
    try{
     console.log("CONTACT BODY >>>", req.body); 
     //Destructuring the body
     const{username,email,message}=req.body;
     const contactcreate=await Contact.create({
      username,
      email,
      message,
     });
    //  console.log("CONTACT SAVED >>>", contactcreate);
     //Handle the response by the Global error Handlers
     const success={
       status:200,
       message:message,
       extraDetails:"Your message has been received by the backend and stored in the database.",
     }
     next(success);
    }
    catch(error)
    {
        console.error("CONTACT ERROR >>>", error);
        //Handle the response by the Global error Handlers
        const err={
            status:500,
            message:message,
            extraDetails:"There was an issue saving your contact form data to the database. Please check your internet connection or try again later",
          }
          next(err);
    }
}
// 5.Create user Route logic(To send user data)
const user=async(req,res)=>{
  try{
    //authMiddleware passing data req.user
   const userData=req.user;
  //console.log("Middleware passing data",userData);
   res.status(200).json({userData});
  }
  catch(error)
  {
    console.log(`error from the user route ${error}`);
  }
}
// 6.Create the services route
const services=async(req,res)=>{
 try{
     const response=await service.find();
     if(!response)
     {
      res.status(404).json({msg:"No service found"});
     }
     res.status(200).json({msg:response});
 }catch(error)
 {
  console.log(`error from the user route ${error}`);
 }
} 
// 7. Logout Route Logic (COOKIE BASED)
const logout = async (req, res, next) => {
  try {
    // 1️⃣ Deactivate all sessions of this user (your logic stays)
    await Session.updateMany(
      { userId: req.userID },
      { isActive: false }
    );

    // 2️⃣ CLEAR JWT COOKIE ✅
    res.clearCookie("accessToken", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
    });

    //Response
    res.status(200).json({ message: "Logged out successfully" });

  } catch (error) {
    next({
      status: 500,
      message: "Logout failed",
    });
  }
};
// // 7. Logout Route Logic
// const logout = async (req, res, next) => {
//   try {
//     await Session.updateMany(
//       { userId: req.userID },
//       { isActive: false }
//     );
//     res.status(200).json({ message: "Logged out successfully" });
//   } catch (error) {
//     next({
//       status: 500,
//       message: "Logout failed",
//     });
//   }
// };


export default home;
export {register,login,contactForm,user,services, logout};
