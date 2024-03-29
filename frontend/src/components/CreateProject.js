import React,{useState, useContext} from 'react'
import axios from 'axios';
import { AuthContext } from '../context/Auth.context.js';
import packageJson from '../../package.json'


const backendLink=packageJson.backendLink;

function CreateProject({project}) {


    const {user,projectState,setProjectState} = useContext(AuthContext);
    const [projectName,setProjectName]=useState('');
    const [projectID,setProjectID]=useState('');


  const createProject=()=>{


    if(projectName.length==0){
        alert('Please enter the value in Project Name.');
        return;
    }

    

    var data={};
    data['projectID']=projectID;
    data['projectName']=projectName;
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
      if(response.data['data']=='failure'){
        alert("Project id already exist!")
        return;
      }
      alert("Created Project!!");

      setProjectState(true);

    }).catch((err)=>{
      console.log('err',err);
    });



  };

  return (
    <div className='bg-white flex justify-center flex-col align-middle content-cente m-10 w-fit'>
        <div className="border-black border-2 border-solid m-2 p-5 flex flex-row items-center align-middle bg-gray-100 w-700">
        <div>
          <div className="px-2">Project ID: </div>
          <div>
            <input type="text"  id="qty" className='w-22 py-1 px-1 m-1 border-solid border-2 border-black' placeholder="Project ID" onChange={(e)=>setProjectID(e.target.value)}/>
          </div>
        </div>
        <div className='mx-5'>
          <div className="px-2">Project Name: </div>
          <div>
            <input type="text"  id="qty" className='w-22 py-1 px-1 m-1 border-solid border-2 border-black' placeholder="Project Name" onChange={(e)=>setProjectName(e.target.value)}/>
          </div>
        </div>
        <div>
          <button id="join-leave" className = "bg-blue-500 hover:bg-blue-700 py-2 px-4 mx-5 rounded text-white m-2" onClick={()=>createProject()}>Create Project</button> 
        </div>
      </div>
    </div>
    
  )
}

export default CreateProject