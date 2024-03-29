import React,{useState, useContext} from 'react'
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { AuthContext } from '../context/Auth.context.js';

import packageJson from '../../package.json'


const backendLink=packageJson.backendLink;

const Login = () => {


  const { login,setProjectState } = useContext(AuthContext);

  const navigate = useNavigate();
  const [isLogin,setIsLogin] = useState(true);

  const [loginUserID,setLoginUserID] = useState("");
  const [loginPassword,setLoginPassword] = useState("");

  const [registerUserID,setRegisterUserID] = useState("");
  const [registerPassword,setRegisterPassword] = useState("");
  const [registerName,setRegisterName] = useState("");
  const [registerRePassword,setRegisterRePassword] = useState("");

  const clickLogin=()=>{

    if(loginUserID.length==0 || loginPassword.length==0){
      alert("Please enter the detail!!");
      return;
    }

    var data={};
    data['userid']=loginUserID;
    data['password']=loginPassword;

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



    axios.post(backendLink+'/api/login/', data, config)
    .then((response) => {
      console.log(response.data);
      if(response.data['data']==208){
        alert("User does not exist! Please SignUp")
      }
      else {
        alert("Done Login")
        login(loginUserID);
        setProjectState(true);
        navigate("/home")
      }
    }).catch((err)=>{
      console.log('err',err);
    });

  };

  const clickSignup=()=>{

    if(registerName.length==0 || registerUserID.length==0 || registerPassword.length==0){
      alert("Please enter the detail!!");
      return;
    }

    if(registerPassword!=registerRePassword){
      alert('Password and Confirm password is not equal!');
      return;
    }

    var data={};
    data['name']=registerName;
    data['userid']=registerUserID;
    data['password']=registerPassword;

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


    axios.post(backendLink+'/api/signup/', data,config)
    .then((response) => {
      console.log(response.data);
      if(response.data['data']=='failure'){
        alert("username already exist!!");
      }
      else {

        alert("Done Signup!!");
        login(registerUserID);
        navigate("/home");
      }
    }).catch((err)=>{
      console.log('err',err);
    });

  };

  return (
    <div className="bg-gray-100 flex flex-col items-center justify-center min-h-screen md:py-2">
    <main className="flex items-center w-full px-2 md:px-20">
      <div className="hidden md:inline-flex flex-col flex-1 space-y-1">
        <p className='text-6xl text-blue-500 font-bold'>NextGen</p>
        <p className='font-medium text-lg leading-1 text-pink-400'>Create Team, checkout hardware!!</p>
      </div>
      {
        isLogin? (
          <div className="bg-white rounded-2xl shadow-2xl flex flex-col w-full md:w-1/3 items-center max-w-4xl transition duration-1000 ease-out">
             <h2 className='p-3 text-3xl font-bold text-pink-400'>NextGen</h2>
             <div className="inline-block border-[1px] justify-center w-20 border-blue-400 border-solid"></div>
             <h3 className='text-xl font-semibold text-blue-400 pt-2'>Sign In!</h3>

             {/* Inputs */}
             <div className='flex flex-col items-center justify-center'>
              <input type='text' className='rounded-2xl px-2 py-1 w-4/5 md:w-full border-[1px] border-blue-400 m-1 focus:shadow-md focus:border-pink-400 focus:outline-none focus:ring-0'
              placeholder='User ID' value={loginUserID} onChange={(e)=>{setLoginUserID(e.target.value)}} ></input>
              <input type="password" className='rounded-2xl px-2 py-1 w-4/5 md:w-full border-[1px] border-blue-400 m-1 focus:shadow-md focus:border-pink-400 focus:outline-none focus:ring-0'
              placeholder='Password' value={loginPassword} onChange={(e)=>{setLoginPassword(e.target.value)}}></input>
              <button className='rounded-2xl m-2 text-white bg-blue-400 w-2/5 px-4 py-2 shadow-md hover:text-blue-400 hover:bg-white transition duration-200 ease-in' onClick={() => clickLogin()}>
                Sign In
              </button>
             </div>
             <div className="inline-block border-[1px] justify-center w-20 border-blue-400 border-solid"></div>
             <p className='text-blue-400 mb-4 text-sm font-medium cursor-pointer' onClick={() => setIsLogin(false)}>Create a New Account?</p>
          </div>
        ):(
          <div className="bg-blue-400 text-black rounded-2xl shadow-2xl  flex flex-col w-full  md:w-1/3 items-center max-w-4xl transition duration-1000 ease-in">
              <h2 className='p-3 text-3xl font-bold text-white'>NextGen</h2>
            <div className="inline-block border-[1px] justify-center w-20 border-white border-solid"></div>
            <h3 className='text-xl font-semibold text-white pt-2'>Create Account!</h3>

            {/* Inputs */}
            <div className='flex flex-col items-center justify-center mt-2'>
            <input type="name" className='rounded-2xl px-2 py-1 w-4/5 md:w-full border-[1px] border-blue-400 m-1 focus:shadow-md focus:border-pink-400 focus:outline-none focus:ring-0'
            placeholder='Name' value={registerName} onChange={(e)=>setRegisterName(e.target.value)}>
            </input>
              <input type='text' className='rounded-2xl px-2 py-1 w-4/5 md:w-full border-[1px] border-blue-400 m-1 focus:shadow-md focus:border-pink-400 focus:outline-none focus:ring-0'
              placeholder='User ID' value={registerUserID} onChange={(e)=>setRegisterUserID(e.target.value)}>
              </input>
              <input type="password" className='rounded-2xl px-2 py-1 w-4/5 md:w-full border-[1px] border-blue-400 m-1 focus:shadow-md focus:border-pink-400 focus:outline-none focus:ring-0'
              placeholder='Password' value={registerPassword} onChange={(e)=>{setRegisterPassword(e.target.value)}}>
              </input>
              <input type="password" className='rounded-2xl px-2 py-1 w-4/5 md:w-full border-[1px] border-blue-400 m-1 focus:shadow-md focus:border-pink-400 focus:outline-none focus:ring-0'
              placeholder='Retype Password' value={registerRePassword} onChange={(e)=>{setRegisterRePassword(e.target.value)}}>
              </input>
              <button className='rounded-2xl m-4 text-blue-400 bg-white w-3/5 px-4 py-2 shadow-md hover:text-white hover:bg-blue-400 transition duration-200 ease-in'
              onClick={() => clickSignup()}>
                Sign Up
              </button>
            </div>
            <div className="inline-block border-[1px] justify-center w-20 border-white border-solid"></div>
            <p className='text-white mb-4 text-sm font-medium cursor-pointer' onClick={() => setIsLogin(true)}>Sign In to your Account?</p>
          </div>
        )
      }
    </main>
     </div>
  )
}

export default Login