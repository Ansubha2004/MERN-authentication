import React,{useEffect} from 'react'
import {useNavigate,useLocation} from "react-router-dom"
import Cookies from "js-cookie"

function refreshhandler({isauthenticated}) {

    const navigate=useNavigate();
    const location=useLocation();
    useEffect(()=>{
        if(Cookies.get("token")!=="")
        {
            isauthenticated(true);
            if (location.pathname === '/' ||
                location.pathname === '/login' ||
                location.pathname === '/register'
            ) {
                navigate('/home');
                }
        }
    },[navigate,location,isauthenticated])

  return (
    null
  )
}

export default refreshhandler
