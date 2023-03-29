import React,{ useContext, useEffect,useState } from 'react'
import Projects from './Projects'
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { AuthContext } from '../context/Auth.context.js';

const backendLink="http://127.0.0.1:5000"

function Home() {


  const navigate = useNavigate();

  const { logout,state,user,setProjectState} = useContext(AuthContext);

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
        if(response.data["id"]=='failure'){
          alert(response.data['data']);
        }
        else {
          alert('Joined '+response.data['data']);
        }

        setProjectState(true);
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
      <div className='align-middle justify-center mx-20 my-10'>
          <input type="text" id="qty" className='w-60 items-center align-middle py-1 px-1 m-1 border-solid border-2 border-black' placeholder="Project ID" onChange={(e)=>setProjectID(e.target.value)}/>
          <button id="join" className = "bg-gray-300 p-2 m-1" onClick={()=>{clickJoin()}}>Join</button>
        </div>
        <div className="col-sm-4">
          <h1>
            <a href="/" onClick={onLogout} className='p-2 m-6'>Logout</a>
          </h1>
        </div>
        
      </div>
      <Projects/>
    </div>
  )
  
  
  
  
}

export default Home