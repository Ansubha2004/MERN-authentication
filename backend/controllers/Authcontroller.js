import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import UserModel from '../models/User.js';

import dotenv from 'dotenv';
dotenv.config();

export const signup = async (req, res) => {
    try{
        const {name,email,password}= req.body;

        const finduser=await UserModel.findOne({email});
        if(finduser){
            return res.status(400).json({success:false,message:"User already exists"});
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword= await bcrypt.hash(password,salt);
        const newUser = await UserModel.create({
            name,
            email,
            password: hashedPassword
        });

        return res.json({success:true,message:"User created successfully",user:newUser});



    }
    catch(err){
        res.status(500).json({success:false,message: "Error signing up"});
    }
}

export const login= async (req, res) => {
    try{
        const {email,password} =req.body;
        const finduser=await UserModel.findOne({email});
        if(!finduser){
            return res.status(400).json({success:false,message:"User not found"});
        }
        const isMatch= await bcrypt.compare(password,finduser.password);
        if(!isMatch){
            return res.status(400).json({success:false,message:"Invalid credentials"});
        }
        const token= jwt.sign({
            id:finduser._id,
            email:finduser.email
        },process.env.JWT_SECRET,
        {
            expiresIn:"10h"
        });
        
        // Set cookie with token
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 10 * 60 * 60 * 1000 // 10 hours in milliseconds
        });
        
        return res.json({success:true,message:"User logged in successfully",user:finduser});
    
    }
    catch(err){
        res.status(500).json({success:false,message: "Error logging in"});
    }
}

export const logout= (req,res)=>{
    try{
        res.cookie('token', "");
        return res.json({success:true,message:"logout sucessfull"})
    }
    catch(err)
    {
        console.log(err)
        return res.json({success:false,message:"Logout issues"})
        
    }
}

export const profile= async (req,res)=>{
    try{
        const userdetails=await UserModel.findOne({email:req.user.email})
        return res.json(userdetails)
    }
    catch(err)
    {
        return res.json({success:false,message:"Failed to track data"})
    }
}