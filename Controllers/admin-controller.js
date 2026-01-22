import Contact from "../models/contact-model.js";
import User from "../models/regis-model.js";

// Controllers for get all users

const getAllUsers=async(req,res,next)=>{
    try{
       //Use the projection
       const users=await User.find({},{password:0});
       console.log(users);
       if(!users || users.length===0)
       {
         return res.status(404).json({message:"No user found"});
       }
    return res.status(200).json(users);
    }
    catch(error)
    { 
     next(error);
    }
  };

  //Controllers for get all contacts
  const getAllContacts=async(req,res,next)=>{
    try{
       //Use the projection
       const contacts=await Contact.find();
       console.log(contacts);
       if(!contacts || contacts.length===0)
       {
         return res.status(404).json({message:"No contacts found"});
       }
    return res.status(200).json(contacts);
    }
    catch(error)
    { 
     next(error);
    }
  };
  //Controllers for delete  user by id 

  const deleteUserById=async(req,res)=>{
     try{
     const id=req.params.id;
     await User.deleteOne({_id:id});
     return res.status(200).json({message:"User Deleted Succesfully"});
     }
     catch(error)
     {
        return res.status(404).json({message:"User not Deleted Succesfully"});
     }
  }
//Controllers for  get all user by id
const getUserById=async(req,res)=>{
    try{
        const id=req.params.id;
        const data=await User.findOne({_id:id},{password:0});
        return res.status(200).json(data);
        }
        catch(error)
        {
           return res.status(404).json({message:"User not Found"});
        }
}
//Controllers for  update the user data 
 async function updateUserById(req,res){
try
{
   const id=req.params.id;
   console.log(id);
   const updateUserData=req.body;
   console.log(updateUserData);
   const updateData=await User.updateOne({_id:id},{
    $set:updateUserData,
   });
   console.log(updateData);
   return res.status(200).json({message:" User update"});
}
catch(error)
{
    return res.status(403).json({message:"User not update"});
}
}
//Controllers for delete  user by id 
const deleteContactById=async(req,res)=>{
    try{
    const id=req.params.id;
    await Contact.deleteOne({_id:id});
    return res.status(200).json({message:"User Deleted Succesfully"});
    }
    catch(error)
    {
       return res.status(404).json({message:"User not Deleted Succesfully"});
    }
 }

export default getAllUsers;
export {getAllContacts,deleteUserById,getUserById,updateUserById,deleteContactById};