import React,{useState,useEffect} from 'react'
import axios from "axios"
import {ToastContainer} from "react-toastify"
import {successmessage,errormessage} from "../utils/toastify.js"

import {useNavigate} from "react-router-dom"



function home() {
    const [data,setdata]=useState('')
    const navigate=useNavigate()
    const Logout=async ()=>{
        const response = await axios.get("http://localhost:2900/auth/logout",{
            withCredentials:true//neccessary for dealing with cookies
        })
        console.log(response.data)
        const {success,message}=response.data;
        console.log(success)
        if(success)
        {
            successmessage(message);
        setTimeout(()=>{
            navigate("/login");
        },2000)
        }
        else
        {
            errormessage("Logout issue")
        }
    }

    const fetchdata=async ()=>{
        try{
            const response=await axios.get("http://localhost:2900/profile/Data",{
                withCredentials:true//neccessary for dealing with cookies
            })
            console.log(response.data);
            setdata(response.data)

        }
        catch(err){
            errormessage("fetching issues",err)
            console.log(err);
        }
    }



    useEffect(()=>{
        fetchdata();
    },[])


  return (

    
    <div>
        <h1 className="text-2xl font-bold">HOme Page </h1>
        <main>
            <p>Name:{data.name}</p>
            <p>Email:{data.email}</p>
        </main>
        <button onClick={Logout}  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Logout</button>
        <ToastContainer/>
    </div>
  )
}

export default home
