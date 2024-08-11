import React from 'react'
import {ToastContainer,toast} from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import styled from "styled-components"
import { useEffect,useState,useRef } from 'react'
import axios from "axios"
import {useNavigate} from "react-router-dom"
import { allContactsRoute,host } from '../utils/API_Routes'
import Contacts from '../components/Contacts'
import Welcome from '../components/Welcome'
import ChatContainer from '../components/ChatContainer'
import {io} from "socket.io-client"


function Chat() {

  const socket=useRef();
  const navigate = useNavigate();

  const [contacts,set_contacts]= useState([]);
  
  const [current_user,set_current_user]= useState(undefined);

  const [current_chat,set_current_chat]=useState(undefined); // current_chat is an object having details of selected chat

  const[current_userloaded,set_currnt_userloaded]=useState(false);

  useEffect(()=>{

    //even after setting of current_user is under async func still it gets used as undefined if we dont use async func specifically at that place ....so whats the async accomplishing here

    const check_localstorage= async ()=>{
      if(!localStorage.getItem("chatX-user"))
      {
        navigate("/login");
      }
      else{
        console.log("chk local  me hu");
        set_current_user( await JSON.parse(localStorage.getItem("chatX-user")));
        set_currnt_userloaded(true);
      }
    }

    check_localstorage();
      
    },[navigate]);


    useEffect(()=>{
      if(current_user)
      {
        socket.current =io(host);
        socket.current.emit("add-user",current_user.user._id);

      }
    },[current_user])



  useEffect(  ()=>{
    const send_curr_user= async ()=>{
      if(current_user)
      {
        console.log("this is current user=>",current_user);
        const data= await axios.get(`${allContactsRoute}/${current_user.user._id}`);

        console.log("this is others contact list=>",data);
      

        set_contacts(data.data); 
        // as data object  returned from axios above stores an array  in field named data
        //(array has=> element which are object having details of other chats)....can see on log
      }
    }
    send_curr_user();
    
  },[current_user]);

  // const toast_option= {
  //   position:"top-right",
  //   autoClose:1000,
  //   pauseOnHover:true,
  //   theme:"dark",
  // }
  // toast.success("Welcome",toast_option)

  const handle_chat_change= (chat)=>{
    set_current_chat(chat); 
    console.log("this is current_chat=>",chat);

  }

  const remove_curr_chat=()=>{
    set_current_chat(undefined); 
    console.log("i am remove_curr_chat");

  }
  
  

  return (
    <>
    <Container>

      <div className="container">

        <Contacts contacts={contacts} current_user={current_user} change_chat={handle_chat_change} />

{
 current_userloaded && current_chat===undefined ? (<Welcome current_user={current_user} />)
  :(<ChatContainer current_chat={current_chat} current_user={current_user} socket={socket} remove_chat={remove_curr_chat} />)
}
      

      </div>


    </Container>

    <ToastContainer/>
    </>
  )
}

const Container= styled.div`
  background-color: #484848;
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: center;
  justify-content: center;

  .container{
    height: 85vh;
    width: 85vw;
    background-color: black;
    border-radius: 1rem;
    display: grid;
    grid-template-columns: 25% 75%;
    @media screen and (min-width:720px) and (max-width:1080px) {
 grid-template-columns:35% 65%;

    }
      
  }
`

export default Chat