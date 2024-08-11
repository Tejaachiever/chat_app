import React from 'react'
import styled from "styled-components"
import {Link, useNavigate} from "react-router-dom"
import { useState,useEffect } from 'react'
import {ToastContainer,toast} from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import axios from "axios"
import { registerRoute } from '../utils/API_Routes'

function Register() {

  const navigate= useNavigate();

  let prostr="";
 
  const [values,set_values]= useState(
    {
      username:"",
      email:"",
      password:"",
      confirm_password:"",
      
    }
  )

  // un comment to get redirect to chat
//   useEffect(()=>{
//     if(localStorage.getItem("chatX-user"))
//     {
// navigate("/chat");
//     }
//   },[]);
  
const toast_option= {
  position:"top-right",
  autoClose:5000,
  pauseOnHover:true,
  theme:"dark",
}

const [profileImage,set_profileImage]=useState("");


  function toBase64(e){
    var reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
  reader.onload=()=>{
    set_profileImage(reader.result);

    // const profileImageString = typeof profileImage === "string" ? profileImage : JSON.stringify(profileImage);

    prostr=reader.result;
    console.log("image string ",prostr);
   
   
    };
    reader.onerror=error=>{
      console.log(reader.result);
    }

  }


const handleValidation=()=>{

  console.log(" validation func being called");

const {username,email,password,confirm_password}= values;

if(username==="" || username.length<1)
{
  toast.error("enter valid username : 3 or more characters",toast_option);
  console.log("inside username");
  return false;

}
else if(email==="")
{
  toast.error("email required",toast_option);
  console.log("inside email");
  return false;

}
else if(password==="")
{
  toast.error("password should be atleast 2 character",toast_option);
  console.log("inside password");
  return false;

}
else if(password!==confirm_password)
{

  toast.error("password and confirm password should be same",toast_option);
  console.log("inside confirm password");
  return false;
}




else{
  console.log("success validation");
  return true;
}
  
}

 

  // handling submit

const handleSubmit= async (event)=>{
  event.preventDefault();

  if(handleValidation()===true)
  {
    console.log("inside validation",registerRoute);
    const {username,email,password}= values;
    
    console.log("checking prostr in submitfront",prostr);
    //will get res from server from userControllers
      const {data} = await axios.post(registerRoute,
        {username,email,password,prostr});

        console.log("showing data from res==>",data);
  
        if(data.status===false){
          toast.error(data.msg,toast_option);
        }
        if(data.status===true)
        {
          toast.success("Registeration Success",toast_option);

          console.log("user stored in mongo & now storing in local");

          //storing creted_user json object received from response as string in BROWSER LOCAL storage
          localStorage.setItem("chatX-user",JSON.stringify(data));

           //navigating page to route "" using useNavigate
        navigate("/chat")

        }

       ;
    

  }
  
}

//sensing changes


const handleChange=(event)=>{
  set_values({...values,[event.target.name]:event.target.value})
  
}



  return (
    <>
    <FormContainer >
       <form onSubmit={(event)=>{
        handleSubmit(event)
       }}>

      <div className="brand">
        <img src="" alt="" />
        <h1>ChatX</h1>
      </div>

      <input type="text"
      placeholder='username'
      name='username'
      onChange={(e)=>{
        handleChange(e);
      }} />

      <input type="email"
      placeholder='email'
      name='email'
      onChange={(e)=>{
        handleChange(e);
      }} />

      <input type="password"
      placeholder='password'
      name='password'
      onChange={(e)=>{
        handleChange(e);
      }} />

      <input type="password"
      placeholder='confirm password'
      name='confirm_password'
      onChange={(e)=>{
        handleChange(e);
      }} />

 {/* image */}

{/* <label htmlFor='profile_pic' className='upload_pic'>
Upload Profile picture
 <input accept='image/*'
 type='file'
 placeholder='upload profile picture'
 id='profile_pic'
 onChange={toBase64} 
 />
 </label> */}


<button id='btn' type='submit'>
  Create User
</button>

<span>already have an account ? <Link to="/login" >  Login </Link>
  </span>

       </form>

    </FormContainer>
    <ToastContainer/>
    </>
  );




}
const FormContainer= styled.div`
height:100vh;
width:100vw;
display:flex;
flex-direction:column;
justify-content:center;
align-items:center;
background-color:#6fa2b7;
gap:1.5rem;

.brand{
  display:flex;
  justify-content:center;
align-items: center;
gap: 1rem;


h1{
  text-align: center;
  font-size: 2rem;
  color:white;
  padding: 1rem 3rem;
  //added
  
  /* animation: pulsate 2.5s infinite alternate;   */

  
  border: 0.2rem solid #fff;
  border-radius: 2rem;
  padding: 0.4em;

  box-shadow: 0 0 .2rem #fff,
            0 0 .2rem #fff,
            0 0 2rem #bc13fe,
            0 0 0.8rem #bc13fe,
            0 0 2.8rem #bc13fe,
            inset 0 0 1.3rem #bc13fe; 
 
}



}

form{
  display: flex;
  max-height: 80%;
  flex-direction: column;
  gap: 0.5rem;
  background-color:#090c0e;
  padding: 1rem 4rem ;
  border-radius: 2rem;



}
input{
  padding: 10px 0;
  /* width: 100%; */
  border: 3px solid black;
  font-size: 1rem;
  border-radius: 1rem;
  &:focus{
    border:  0.3rem solid  #5ccb41;
  }
  text-align: center;

  
}

::-webkit-input-placeholder {
        text-align: center;
      }
:-moz-placeholder {
        text-align: center;
      }

/* input[type="file"]{
  display: none;
} */


.upload_pic{
    color: white;
    text-align: center;
    border: 0.1rem solid ;
    border-radius: 0.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
    
  }

button{
  padding: 0.3rem 1rem;
  background-color: black;
  color: white;
  font-size: 1rem;
  border: 0.1rem solid white;
  border-radius: 0.5rem;
  font-weight: bold;
  text-transform: uppercase;
  /* transition: 0.3s ease-in-out; */
  &:hover{
    background-color: #5ccb41;
  }
  &:active {
    background-color: #ffbf00;
}
  

}



span{
  color: white;
  text-transform: uppercase;
  padding: 2rem 0;
  

  a{
    text-decoration: none;
    background-color: #9e19198c;
    padding: 0.5rem;
    color: white;
    border-radius: 0.5rem;

    transition: 0.2s ease-in-out;
  &:hover{
    background-color: #5ccb41;
  }

  }
}



`;





export default Register