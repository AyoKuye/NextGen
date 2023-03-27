import React,{ useContext, useEffect,useState } from 'react'
import Projects from './Projects'

import { useNavigate } from "react-router-dom";

import { AuthContext } from '../context/Auth.context.js';

function Home() {


  const navigate = useNavigate();

  const { logout,state,user} = useContext(AuthContext);

  const [projectid,setProjectID]=useState('');

 
  const clickJoin=()=>{

    setStatusCheck(true);


    const config={
      headers:{
        'content-type':'application/json',
        "Access-Control-Allow-Origin":"*",
        "Access-Control-Allow-Headers":"X-Requested-With",
        "Content-Security-Policy": "upgrade-insecure-requests",
        "mode": "cors"
      }
    };



    axios.post(backendLink+'/api/join/'+projectid, config)
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

      <div className="col-sm-4 justify-end">
        <h1>
          <a href="/" onClick={onLogout}>Logout</a>
        </h1>
      </div>
        <div className=''>
                <input type="text" id="qty" className='w-40 items-center align-middle py-1 px-1 m-1 border-solid border-2 border-black' placeholder="Project ID" onChange={(e)=>setProjectID(e.target.value)}/>
                <button id="join" className = "bg-gray-300 p-2 m-1" onClick={()=>{clickJoin()}}>Join</button>
        </div>
        <Projects/>
    </div>
  )
}

export default Home