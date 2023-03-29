import React,{useEffect, useContext, useState} from 'react'
import axios from 'axios';

import { AuthContext } from '../context/Auth.context.js';

const backendLink="http://127.0.0.1:5000"

function Project({project,hwset}) {


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



    axios.post(backendLink+'/api/checkin/'+project.ProjectId+"/"+hwset1qty, config)
    .then((response) => {
        alert(response.data[1]+' hardware checked in');
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



    axios.post(backendLink+'/api/checkout/'+project.ProjectId+"/"+hwset1qty, config)
    .then((response) => {
        alert(response.data[1]+' hardware checked out');
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



    axios.post(backendLink+'/api/checkin/'+project.ProjectId+"/"+hwset2qty, config)
    .then((response) => {
        alert(response.data[1]+' hardware checked in');
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



    axios.post(backendLink+'/api/checkout/'+project.ProjectId+"/"+hwset2qty, config)
    .then((response) => {
        alert(response.data[1]+' hardware checked out');
    }).catch((err)=>{
      console.log('err',err);
    });

  };


  const clickLeft=()=>{

    setProjectState(true);

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
                    {/* HWSet1: {hwset.hwset1.checkedOutQty}/100   */}
                </div>
                <div className='my-1'>
                    {/* HWSet2: {hwset.hwset2.checkedOutQty}/100   */}
                </div>
            </div>
            <div>
                <div>
                    <input type="number" id="qty" className='w-25 py-1 px-1 m-1 border-solid border-2 border-black' placeholder="Enter qty" />
                </div>
                <div>
                    <input type="number"  id="qty" className='w-25 py-1 px-1 m-1 border-solid border-2 border-black' placeholder="Enter qty" />
                </div>
            </div>
            <div>
                <div>
                    <button id="Checkin" className = "bg-gray-300 p-2 m-1">Check In</button>
                </div>
                <div>
                    <button id="Checkin" className = "bg-gray-300 p-2 m-1">Check In</button>
                </div>
            </div>
            <div>
                <div>
                    <button id="Checkout" className = "bg-gray-300 p-2 m-1">Check Out</button>
                </div>
                <div>
                    <button id="Checkout" className = "bg-gray-300 p-2 m-1">Check Out</button>
                </div>
            </div>
         <div>
          <button id="join-leave" className = "bg-gray-300 py-2 px-4 m-2" onClick={()=>clickLeft()}>Leave</button> 
          </div>
      </div>
        
</div>
    
  )
}

export default Project