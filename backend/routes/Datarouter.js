import express from "express"
import {isLoggedIn} from "../middleware/isloggedIn.js"
import {profile} from "../controllers/Authcontroller.js"


const router=express.Router();


router.get("/Data",isLoggedIn,profile)

export default router