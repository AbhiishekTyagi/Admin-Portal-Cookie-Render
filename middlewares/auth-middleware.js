import jwt from "jsonwebtoken";
import User from "../models/regis-model.js";
import Session from "../models/session-model.js";
async function authMiddleware(req,res,next)
{
  //  const token =req.header("Authorization");
  const token = req.cookies.accessToken;
   if(!token)
   {
    // If you attempt to use an expired token,you will receive 401 unauthorized HTTP request
    return res.
    status(401). 
    json({message:"Unauthorized HTTP,Token not Provide"});
   }
  //  const jwtToken=token.replace("Bearer","").trim();
  //  console.log("token from auth middlware:",jwtToken);

   try{
      //SESSION CHECK (KEY LINE)
    const session = await Session.findOne({
      token: token,
      isActive: true,
    });

    if (!session) {
      return res
        .status(401)
        .json({ message: "Session expired, please login again" });
    }
    // JWT verify
    const isVerified=jwt.verify(token,process.env.JWT_SECRET_KEY);
    // Data after token verification
    console.log("Verified token :",isVerified);
    //That data match in this database corresponding to the email
    const userdata=await User.findOne({email:isVerified.email}).select({password:0,});
    // Data after match email on the console screen on server
    console.log(userdata);

    // Use custom property  when we using this Middleware
    //Attach data to request
    req.user=userdata;
    req.token=token;
    req.userID=userdata._id;

    // Move to the next Middleware or route handler
    next();
  }
  catch(error)
  {
    return res.status(401).json({message:"Unauthorized,Invalid token"});
  }
}
export default authMiddleware;