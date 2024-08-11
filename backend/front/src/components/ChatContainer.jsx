import React, { useState, useEffect,useRef } from 'react'
import styled from "styled-components"
import { useNavigate } from 'react-router-dom';
import ChatMessages from "./ChatMessages"
import ChatInput from "./ChatInput"
import { GrLogout } from 'react-icons/gr';
import { IoMdArrowRoundBack } from 'react-icons/io';
import axios from 'axios';
import { addMsgRoute, getMsgRoute } from '../utils/API_Routes';

function ChatContainer({current_chat , current_user, socket, remove_chat}) {

   
    
    
    const [arrivalMessage, setArrivalMessage] = useState(null);
    const [extractedMsg,set_extractedMsg]=useState([]);
    // const[swapTrueFalse,set_swapTrueFalse]=useState(undefined);

    useEffect(
       ()=>{
       

       
        const handleExtratctedMsg= async()=>{

            if(current_user && current_chat)

            {

                const extractedMsg= await axios.post(getMsgRoute,{
                    to:current_chat._id,
                from:current_user.user._id,
            });

            console.log("this is extracted msg=>",extractedMsg, " from =>",current_user.user.username);
            
            set_extractedMsg(extractedMsg.data);
            // .data used to assign array 
        }
            
        }

        handleExtratctedMsg();
       


       }
   ,[current_chat,current_user] );



    const handleSentMsg= async (msg)=>{

        
socket.current.emit("send-msg",{
    to:current_chat._id,
    from:current_user.user._id,
    message:msg,
})
        

        await axios.post(addMsgRoute,{
            to:current_chat._id,
            from:current_user.user._id,
            message:msg,
        });

        const msgs_array =[...extractedMsg];
        msgs_array.push({
        
            from_me:true,
            message:msg,
        });
        //element without msg_id .....seems like its done to show msg to current user instanly without relying on actual extracted from database

        set_extractedMsg(msgs_array);
            
     

    };

    useEffect(()=>{
        if(socket.current)
        {
            socket.current.on("msg-received",(msg)=>{
                setArrivalMessage({
                 
                    from_me:false,
                    message:msg})
            });
        }
    },[]);

    useEffect(()=>{
        arrivalMessage && set_extractedMsg((prev)=>[...prev,arrivalMessage]);

    },[arrivalMessage]);

   

   

    const navigate= useNavigate();

    const logOut= ()=>{
        console.log("i am log out");
   localStorage.removeItem("chatX-user");
   navigate("/login")
    }

  return (

    <>
    {
        current_chat &&
        
        
        (
            <Container>

    <div className="chat-header">





        <IoMdArrowRoundBack className='left'  onClick={remove_chat} />


        <div className="selected-chat-details">
            <div className="selected-user-pic">
            {current_chat.username.slice(0,1)}
            </div>
            <div className="selected-user-name">
                <h2>{current_chat.username}</h2>
            </div>
        </div >

       

           <GrLogout className="log-out"  alt='logout'  onClick={logOut} />
    
            
      
    </div>

    <ChatMessages  extractedMsg={extractedMsg} />

    <ChatInput  handleSentMsg={handleSentMsg} />

   
    </Container>)
    }
    </>
  )
}

const Container= styled.div`
    color: white;

    display: grid;
    grid-template-rows: 10% 75% 15%;
    overflow: hidden;

    @media screen and (min-width:720px) and (max-width:1080px) {
 grid-template-rows:15%  70% 15%;

    }

.chat-header{
    display: flex;
background-color: #456977;
align-items: center;
justify-content: space-between;
border: 0.1rem solid black;



   

    svg.left{
        display: flex;
    align-items: center;
    margin: 0rem 0.5rem ;
    background-color:#c4baba;
    border-radius: 1rem;

        font-size: 2rem;
        padding: 0.2rem;
        color: #000000;

        &:active{
            color: green;
        }
        &:hover{
            border: 0.1rem solid white;
            background-color: #eb7272;
        }

        
    }


.selected-chat-details{
    display: flex;
    gap: 0.3rem;
    background-color: #46466c;
    border-radius: 0.3rem;
    margin:0 0.3rem ;
    padding: 0.3rem;
    align-items: center;
    
    

    .selected-user-pic{
img{
    height: 2rem;
}

background-color: #9bd055;
height: 2rem;
width: 2rem;
display: flex;
align-items: center;
justify-content: center;
border-radius: 1rem;
    }
    .selected-user-name{
        color: white;

    }

}
   


        svg.log-out{

            height: 2rem;
            width: 2rem;
            
            cursor: pointer;
            
           box-sizing: border-box;
           
            margin: 0.3rem ;

background-color: #c4baba;
padding: 0.3rem;
border-radius: 0.5rem;


 &:hover{
     background-color: #eb7272;
     border: 0.1rem solid;
     
}
        }
       


      
}



`

export default ChatContainer