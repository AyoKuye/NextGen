import React,{useEffect, useContext, useState} from 'react'
import axios from 'axios';

import { AuthContext } from '../context/Auth.context.js';

const backendLink="http://127.0.0.1:5000"

function Project({project,hwset1,hwset2}) {


    const { user,projectState,setProjectState} = useContext(AuthContext);
    const [hwset1qty,setHWSet1qty]=useState(0);
    const [hwset2qty,setHWSet2qty]=useState(0);



  const clickCheckin1=()=>{


    const config={
      headers:{
        'content-type':'application/json',
        "Access-Control-Allow-Origin":"*",
        "Access-Control-Allow-Headers":"X-Requested-With",
        "Content-Security-Policy": "upgrade-insecure-requests",
        "mode": "cors"
      }
    };



    axios.post(backendLink+'/api/checkin/'+project.ProjectId+"/"+"hwset1"+"/"+hwset1qty, config)
    .then((response) => {
      if(response.data['data']=='failure'){
        alert('failure')
      }
      else {
        
        alert(response.data['data']+' hardware checked in');
        setProjectState(true);
      }
    }).catch((err)=>{
      console.log('err',err);
    });

  };


  const clickCheckout1=()=>{




    const config={
      headers:{
        'content-type':'application/json',
        "Access-Control-Allow-Origin":"*",
        "Access-Control-Allow-Headers":"X-Requested-With",
        "Content-Security-Policy": "upgrade-insecure-requests",
        "mode": "cors"
      }
    };



    axios.post(backendLink+'/api/checkout/'+project.ProjectId+"/"+"hwset1"+"/"+hwset1qty, config)
    .then((response) => {
      if(response.data['data']=='failure'){
        alert('failure')
      }
      else {
        alert(response.data['data']+' hardware checked in');
        setProjectState(true);
      }
    }).catch((err)=>{
      console.log('err',err);
    });

  };


  const clickCheckin2=()=>{




    const config={
      headers:{
        'content-type':'application/json',
        "Access-Control-Allow-Origin":"*",
        "Access-Control-Allow-Headers":"X-Requested-With",
        "Content-Security-Policy": "upgrade-insecure-requests",
        "mode": "cors"
      }
    };



    axios.post(backendLink+'/api/checkin/'+project.ProjectId+"/"+"hwset2"+"/"+hwset2qty, config)
    .then((response) => {

      if(response.data['data']=='failure'){
        alert('failure')
      }
      else {
        alert(response.data['data']+' hardware checked in');
        setProjectState(true);
      }
    }).catch((err)=>{
      console.log('err',err);
    });

  };


  const clickCheckout2=()=>{




    const config={
      headers:{
        'content-type':'application/json',
        "Access-Control-Allow-Origin":"*",
        "Access-Control-Allow-Headers":"X-Requested-With",
        "Content-Security-Policy": "upgrade-insecure-requests",
        "mode": "cors"
      }
    };



    axios.post(backendLink+'/api/checkout/'+project.ProjectId+"/"+"hwset2"+"/"+hwset2qty, config)
    .then((response) => {
      
      if(response.data['data']=='failure'){
        alert('failure')
      }
      else {
        alert(response.data['data']+' hardware checked in');
        setProjectState(true);
      }

    }).catch((err)=>{
      console.log('err',err);
    });

  };


  const clickLeft=()=>{


    const config={
      headers:{
        'content-type':'application/json',
        "Access-Control-Allow-Origin":"*",
        "Access-Control-Allow-Headers":"X-Requested-With",
        "Content-Security-Policy": "upgrade-insecure-requests",
        "mode": "cors"
      }
    };



    axios.post(backendLink+'/api/leave/'+project.ProjectId+"/"+user, config)
    .then((response) => {
        console.log(response.data);
        alert('Left '+response.data);

      setProjectState(true);
    }).catch((err)=>{
      console.log('err',err);
    });



  };


  return (
    <div className=''>
        <div className="border-black border-2 border-solid m-2 flex flex-row items-center align-middle bg-[#c0d19f] w-700">
        <div className="px-2">{project.ProjectName}</div>
        {/* <div className="px-2">
          <span id="">Authorized Users:</span>
          {project.users && project.users.map((user) => (
            <p className="" key={user}>
              {user}&nbsp;
            </p>
          ))
          }
        </div> */}
            <div className='px-2 justify-between flex flex-col items-center mx-5'>
                <div className='my-1'>
                    HWSet1: {hwset1}/1000
                </div>
                <div className='my-1'>
                    HWSet2: {hwset2}/1000  
                </div>
            </div>
            <div>
                <div>
                    <input type="number" id="qty" className='w-25 py-1 px-1 m-1 border-solid border-2 border-black' placeholder="Enter qty" onChange={(e)=>setHWSet1qty(e.target.value)}/>
                </div>
                <div>
                    <input type="number"  id="qty" className='w-25 py-1 px-1 m-1 border-solid border-2 border-black' placeholder="Enter qty" onChange={(e)=>setHWSet2qty(e.target.value)} />
                </div>
            </div>
            <div>
                <div>
                    <button id="Checkin" className = "bg-blue-500 hover:bg-blue-700 py-2 px-4 rounded text-white m-1" onClick={(e)=>clickCheckin1(e)}>Check In</button>
                </div>
                <div>
                    <button id="Checkin" className = "bg-blue-500 hover:bg-blue-700 py-2 px-4 rounded text-white m-1" onClick={(e)=>clickCheckin2(e)}>Check In</button>
                </div>
            </div>
            <div>
                <div>
                    <button id="Checkout" className = "bg-blue-500 hover:bg-blue-700 py-2 px-4 rounded text-white m-1" onClick={(e)=>clickCheckout1(e)}>Check Out</button>
                </div>
                <div>
                    <button id="Checkout" className = "bg-blue-500 hover:bg-blue-700 py-2 px-4 rounded text-white m-1" onClick={(e)=>clickCheckout2(e)}>Check Out</button>
                </div>
            </div>
         <div>
          <button id="join-leave" className = "bg-blue-500 hover:bg-blue-700 py-2 px-4 rounded text-white font-bold m-2" onClick={()=>clickLeft()}>Leave</button> 
          </div>
      </div>
        
</div>
    
  )
}

export default Project