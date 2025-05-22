import express from  "express";
import {signup,login,logout} from '../controllers/Authcontroller.js';
import { authsignupValidation,authloginValidation } from "../middleware/Authvalidation.js";


const router = express.Router();



router.post('/login',authloginValidation,login);

router.post('/register',authsignupValidation,signup)

router.get('/logout',logout)

export default router;