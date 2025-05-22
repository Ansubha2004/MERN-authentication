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
        res.cookie('jwt',token);
        return res.json({success:true,message:"User logged in successfully",user:finduser,token:token});
    
    }
    catch(err){
        res.status(500).json({success:false,message: "Error logging in"});
    }
}