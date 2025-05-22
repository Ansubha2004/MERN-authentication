import React,{useState} from "react";
import { ToastContainer } from "react-toastify";
import { successmessage, errormessage } from "../utils/toastify.js";
import {useNavigate} from "react-router-dom"
import axios from "axios"


function login() {


    const [logininfo,setlogininfo]=useState({
        email:'',
        password:''
    })

    const handlechange=(e)=>{
        const {name,value}=e.target;
        console.log(name,value);
        const shallowcopyinfo={...logininfo};
        shallowcopyinfo[name]=value;
        setlogininfo(shallowcopyinfo)
    }


    const navigate=useNavigate();
    const handleform=async (e)=>{
        e.preventDefault();//prevent form reload
        const {email,password}=logininfo;
        if(!email || !password)
        {
            errormessage("Fill the login data properly");
            console.log("Fill the login data properly");
        }
        try{
            const response = await axios.post("http://localhost:2900/auth/login",logininfo,{
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true
            })
            const {success,message,token,error}=response.data;
            if(success)
            {
                successmessage(message);
            
                setTimeout(()=>{
                    navigate("/home")
                },2000)
                console.log("login post successful",message)
            }
            if(error)
            {
                errormessage(error);
                console.log("Error while register post",error)
            }
            console.log(response.data);
            
        }
        catch(err)
        {
            errormessage("Login issue")
            console.log("fetching issues", err)
        }
    }



  return (
    <div className="p-4">
      <form
        onSubmit={handleform}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
      >
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            onChange={handlechange}
            value={logininfo.email}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="password"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Password
          </label>
          <input
            type="password"
            name="password"
            id="password"
            onChange={handlechange}
            value={logininfo.password}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Login
        </button>
      </form>
      <p className="text-center text-gray-500 text-xs">
        Want to an account?{" "}
        <a className="text-blue-500 hover:text-blue-700" href="/register">
          Register
        </a>
      </p>
      <ToastContainer />
    </div>
  );
}

export default login;
