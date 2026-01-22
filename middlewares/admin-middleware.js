const adminMiddleware=async(req,res,next)=>{
  try{
  //req.user value coming from another middleware auth-middleware
   console.log(req.user);
   const adminRole=req.user.isAdmin;
   if(!adminRole)
   {
       return res.status(403).json({message:"Access denied.User is not a admin"});
   }
   next(); //Continue with controllers and get data
  }
  catch(error)
  {
    next(error);
  }
}
export default adminMiddleware;