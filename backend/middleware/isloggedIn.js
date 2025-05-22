import jwt from "jsonwebtoken"
import dotenv from "dotenv";
dotenv.config();

export const isLoggedIn=(req,res,next)=>{
    try{
        const token=req.cookies.token;
        if(token==="")
        {
            return res.json({success:false,message:"Empty jwt ie logout"})
        }
        else
        {
            const decoded=jwt.verify(token,process.env.JWT_SECRET)
            req.user=decoded;
            next();
        }
    }
    catch(err)
    {
        return res.json({success:false,message:"JWT token issue"})
    }
   
}


