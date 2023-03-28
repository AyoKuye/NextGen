import React,{useState, useContext} from 'react'
import axios from 'axios';
import { AuthContext } from '../context/Auth.context.js';


const backendLink="http://127.0.0.1:5000"

function CreateProject({project}) {


    const {user} = useContext(AuthContext);
    const [projectName,setProjectName]=useState('');
    const [projectID,setProjectID]=useState('');
    const [hwset1,setHWSet1]=useState('');
    const [hwset2,setHWSet2]=useState('');


  const createProject=()=>{


    if(projectName.length==0){
        alert('Please enter the value in Project Name.');
        return;
    }

    if(hwset1.length==0){
        alert('Please enter the value in HWSet1.');
        return;
    }
    
    if(hwset2.length==0){
        alert('Please enter the value in HWSet2.');
        return;
    }
    

    var data={};
    data['projectID']=projectID;
    data['projectName']=projectName;
    data['hwset1']=hwset1;
    data['hwset2']=hwset2;
    data['user']=user;

    console.log("send format",data);

    const config={
      headers:{
        'content-type':'application/json',
        "Access-Control-Allow-Origin":"*",
        "Access-Control-Allow-Headers":"X-Requested-With",
        "Content-Security-Policy": "upgrade-insecure-requests",
        "mode": "cors"
      }
    };


    axios.post(backendLink+'/api/createproject/', data,config)
    .then((response) => {
      console.log(response.data);
      alert("Created Project!!");
    }).catch((err)=>{
      console.log('err',err);
    });

  };

  return (
    <div className='bg-white flex justify-center flex-col align-middle content-cente m-10 w-fit'>
        <div className="border-black border-2 border-solid m-2 flex flex-row items-center align-middle bg-gray-100 w-700">
        <div>
          <div className="px-2">Project ID: </div>
          <div>
            <input type="text"  id="qty" className='w-22 py-1 px-1 m-1 border-solid border-2 border-black' placeholder="Project ID" onChange={(e)=>setProjectID(e.target.value)}/>
          </div>
        </div>
        <div>
          <div className="px-2">Project Name: </div>
          <div>
            <input type="text"  id="qty" className='w-22 py-1 px-1 m-1 border-solid border-2 border-black' placeholder="Project Name" onChange={(e)=>setProjectName(e.target.value)}/>
          </div>
        </div>
        <div className='px-2 justify-between flex flex-col items-center mx-5'>
            <div className='my-1'>
                HWSet1: 
            </div>
            <div className='my-1'>
                HWSet2: 
            </div>
        </div>
        <div>
            <div>
                <input type="number" id="qty" className='w-25 py-1 px-1 m-1 border-solid border-2 border-black' placeholder="Enter qty" onChange={(e)=>setHWSet1(e.target.value)}/>
            </div>
            <div>
                <input type="number"  id="qty" className='w-25 py-1 px-1 m-1 border-solid border-2 border-black' placeholder="Enter qty" onChange={(e)=>setHWSet2(e.target.value)} />
            </div>
        </div>
        <div>
          <button id="join-leave" className = "bg-gray-300 py-2 px-4 m-2" onClick={()=>createProject()}>Create Project</button> 
        </div>
      </div>
    </div>
    
  )
}

export default CreateProject