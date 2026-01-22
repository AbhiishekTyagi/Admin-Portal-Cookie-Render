import express from "express";
const router=express.Router();
import home,{register,login,contactForm,user,services,logout} from "../Controllers/auth-controller.js";
import signupSchema from "../Validators/signup-validators.js";
import loginSchema from "../Validators/login-validator.js";
import contactSchema from "../Validators/contact-validator.js";
import validate from "../middlewares/validate-middleware.js";
import authMiddleware from "../middlewares/auth-middleware.js";


router.route("/").get(home);
router.route("/register").post(validate(signupSchema),register);
router.route("/login").post(validate(loginSchema),login);
router.route("/contact").post(validate(contactSchema),contactForm);
//Go through this  authMiddleware for check user has verified token then goes to the controller user
router.route("/user").get(authMiddleware,user);
//Create the route for service
router.route("/service").get(services);
// When user going to logout from front-End and Back-End as well
router.route("/logout").post(authMiddleware, logout);

export default router;
