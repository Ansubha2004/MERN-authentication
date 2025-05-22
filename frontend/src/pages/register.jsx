import React,{useState} from "react";
import axios from "axios"
import {ToastContainer} from "react-toastify"
import {successmessage,errormessage} from "../utils/toastify"
import {useNavigate} from "react-router-dom"

function register() {

    const [registerinfo,setregisterinfo]=useState({
        name:'',
        email:'',
        password:''
    })

    
    const handlechange=(e)=>{
        const {name,value}=e.target;
        console.log(name,value);
        const shallowcopyinfo={...registerinfo}//creating shallow copy
        shallowcopyinfo[name]=value;
        setregisterinfo(shallowcopyinfo)

    }

    const navigate=useNavigate();

    const handleformchange=async (e)=>{
        e.preventDefault();//stops reload of form
        const {name,email,password}=registerinfo;
        if(!name || !email || !password)
        {
            errormessage("fill all the credentials ")
            console.log("fill all the credentials ")
        }

        try{
            const response = await axios.post("http://localhost:2900/auth/register",registerinfo,{
                headers: {
                    'Content-Type': 'application/json'
                  }
            })
            const {success,message,error}=response.data;
            if(success)
            {
                successmessage(message);
                setTimeout(()=>{
                    navigate("/login")
                },2000)
                console.log("registration post successful",message)
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
            console.log("Fetching error",err)
        }
    }

  return (
    <div className="p-4">
      <form onSubmit={handleformchange} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="mb-4">
          <label
            htmlFor="name"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Name
          </label>
          <input
            onChange={handlechange}
            type="text"
            name="name"
            id="username"
            value={registerinfo.name}
            
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Email
          </label>
          <input
            onChange={handlechange}
            type="email"
            name="email"
            id="email"
            value={registerinfo.email}
            
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
            onChange={handlechange}
            type="password"
            name="password"
            id="password"
            value={registerinfo.password}
            
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Register
        </button>
      </form>
      <p className="text-center text-gray-500 text-xs">
        Already have an account?{" "}
        <a className="text-blue-500 hover:text-blue-700" href="/login">
          Login
        </a>

      </p>
      <ToastContainer />
    </div>
  );
}

export default register;
