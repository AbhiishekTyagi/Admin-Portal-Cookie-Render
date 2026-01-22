import express from "express";
import getAllUsers,{getAllContacts,deleteUserById,getUserById,updateUserById,deleteContactById} from "../Controllers/admin-controller.js";
import authMiddleware from "../middlewares/auth-middleware.js";
import adminMiddleware from "../middlewares/admin-middleware.js";

const adminrouter=express.Router();

//Go through this  authMiddleware for check user has verified token then goes to the controller getAllUsers
adminrouter.route("/users").get(authMiddleware,adminMiddleware,getAllUsers);

//To update the users we create route and controller
adminrouter.route("/users/:id").get(authMiddleware,adminMiddleware,getUserById);

//To update the users data we create route and controller
adminrouter.route("/users/update/:id").patch(authMiddleware,adminMiddleware,updateUserById);


//To delete the users we create route and controller 
adminrouter.route("/delete/:id").delete(authMiddleware,adminMiddleware,deleteUserById);

//To get all contact we create route and controller 
adminrouter.route("/contacts").get(authMiddleware,adminMiddleware,getAllContacts);

//To delete the contact we create route and controller 
adminrouter.route("/delete/contact/:id").delete(authMiddleware,adminMiddleware,deleteContactById);


export default adminrouter;

