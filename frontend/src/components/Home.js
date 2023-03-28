import React,{ useContext, useEffect,useState } from 'react'
import Projects from './Projects'
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { AuthContext } from '../context/Auth.context.js';

const backendLink="http://127.0.0.1:5000"

function Home() {


  const navigate = useNavigate();

  const { logout,state,user} = useContext(AuthContext);

  const [projectid,setProjectID]=useState('');

 
  const clickJoin=()=>{

    const config={
      headers:{
        'content-type':'application/json',
        "Access-Control-Allow-Origin":"*",
        "Access-Control-Allow-Headers":"X-Requested-With",
        "Content-Security-Policy": "upgrade-insecure-requests",
        "mode": "cors"
      }
    };



    axios.post(backendLink+'/api/join/'+projectid+'/'+user, config)
    .then((response) => {
        console.log(response.data);
        alert('Joined '+response.data);
    }).catch((err)=>{
      console.log('err',err);
    });

  };




  const onLogout = (e) => {
    e.preventDefault();
    logout();
    navigate('/');
  }

  return (
    <div className='flex flex-col'>
      <div className='flex justify-between'>
        <div className="col-sm-4">
          <h1>
            <a href="/" onClick={onLogout} className='bg-gray-300 p-2 m-1'>Logout</a>
          </h1>
        </div>
        <div className=''>
          <input type="text" id="qty" className='w-40 items-center align-middle py-1 px-1 m-1 border-solid border-2 border-black' placeholder="Project ID" onChange={(e)=>setProjectID(e.target.value)}/>
          <button id="join" className = "bg-gray-300 p-2 m-1" onClick={()=>{clickJoin()}}>Join</button>
        </div>
      </div>
      <Projects/>
    </div>
  )
  
  
  
  
}

export default Home