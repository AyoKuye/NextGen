import React,{ useContext, useEffect,useState } from 'react'
import Project from './Project';
import CreateProject from './CreateProject';
import { AuthContext } from '../context/Auth.context.js';
import { useNavigate } from "react-router-dom";
import axios from 'axios';



const backendLink="http://127.0.0.1:5000"

function Projects() {

  const navigate = useNavigate();

  const { logout,state,user,projectState,setProjectState} = useContext(AuthContext);
  const [projectData,setProjectData]=useState([]);

  useEffect(()=>{
    
    if(!state['isLoggedIn']){
      navigate('/');
      return;
    }

    if(!projectState)return;

    const config={
      headers:{
        'content-type':'application/json',
        "Access-Control-Allow-Origin":"*",
        "Access-Control-Allow-Headers":"X-Requested-With",
        "Content-Security-Policy": "upgrade-insecure-requests",
        "mode": "cors"
      }
    };

    axios.post(backendLink+'/api/getProjects/'+user, config)
    .then((response) => {
      if(response.data['data']==208){
        alert("User does not exist! Please SignUp")
      }
      else {
        setProjectData(response.data);
      }

    setProjectState(false);
    }).catch((err)=>{
      console.log('err',err);
    });


  },[projectState]);
        
  return (
    <div>
      <div className="bg-white flex justify-center flex-col px-10 align-middle content-center border-black border-2 border-solid m-10 w-fit">
        <div className="font-bold my-5 px-3">
          <h1>Projects</h1>
        </div>
        {projectData && projectData.map((project) => (
          <Project key={project._id} project={project} />
        ))}
      </div>
      <div>
        <CreateProject/>
      </div>  
    </div>
  )
}

export default Projects