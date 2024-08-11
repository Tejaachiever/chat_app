import React from 'react'
import styled from "styled-components"
import { useState } from 'react';
import EmojiPicker, { Emoji } from 'emoji-picker-react';
import { AiOutlineSend } from 'react-icons/ai';
import { BsEmojiSmile } from 'react-icons/bs';

function ChatInput({handleSentMsg}) {



const [ShowEmojiPicker, setShowEmojiPicker]=useState(false);
const [msg,setmsg]=useState("");

  const handleEmojiPicker_HideShow=()=>{
      setShowEmojiPicker(!ShowEmojiPicker);
  }

  const handleEmojiClick= (emoji_data,event)=>{
    
    let message =msg;
    message= message + emoji_data.emoji;
    setmsg(message);
  }



const SendMsg=()=>{
  if(msg!="")
  {
    handleSentMsg(msg);
    setmsg("");

  }
}

const previewConfig = {
  showPreview: false, // Set showPreview to false to hide the emoji preview
};


  return (
    <Container>

<div className="emoji-container">

    <div className="emoji">
      < BsEmojiSmile   onClick={handleEmojiPicker_HideShow}  />

      
      { ShowEmojiPicker && <EmojiPicker  onEmojiClick={handleEmojiClick}
      height={300} width={250}  previewConfig={previewConfig}/>}
    </div>
</div>

 

    <div className="input-container">
   
    
      
        <input type="text" placeholder='type your message' className="input-msg" 
        value={msg}
        onChange={(event)=>{setmsg(event.target.value);}}
        />

        <button className='send-btn'
        onClick={SendMsg}>
          <AiOutlineSend/>
        </button>
     
    </div>
    </Container>
  )
}

const Container= styled.div`

  background-color:grey ;
  display: grid;
  grid-template-columns: 10% 90%;
  align-items: center;
  padding: 0.3rem;
  
  
  .emoji-container{
    
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    gap: 1rem;
    position: relative;
    
    
    .emoji{
      
      
      
      svg{
        box-sizing: border-box;
        font-size: 2rem;
        background-color: yellow;
        border-radius: 2rem;
        color: black;
        cursor: pointer;
        &:hover{
          border: 0.2rem solid green;
        }
      }
      
      .EmojiPickerReact {
        position: absolute;
        
        bottom: 60px;
        background-color: #080420;
        box-shadow: 5px 5px 10px #9a86f3;
        border-color: #9a86f3;
     ::-webkit-scrollbar {
          background-color: #080420;
          width: 10px;
          &-thumb {
            background-color: #9a86f3;
          }
        }
        .emoji-categories {
          button {
            filter: contrast(0);
          }
        }
        .emoji-search {
          background-color: transparent;
          border-color: #9a86f3;
          height: 10px;
        }
        .emoji-group:before {
          background-color: #080420;
        }
      }
      
      
    }
    
  }


  

  .input-container{
   

   display: flex;
    align-items: center;
    justify-content: center;
    
    height: 2.5rem;
      border:0.1rem solid black ;
      border-radius: 1rem ;
      background-color: #635d5d;

    input{
      
      width: 90%;
      height: 100%;
      border: none;
      border-radius: 1rem 0 0 1rem;
      background-color: wheat;
      padding: 0 0.6rem;
      
      /* text-align: center; */
      font-size: 1.1rem;

      &::placeholder{
      text-align:center;
      }
    }

    button{
      width: 10%;
      
      border: none;
      border-left: 0.2rem solid ;
      
      
      border-radius:0 1rem 1rem 0;
      background-color: #069106;
      

      &:hover{
        border: 0.2rem solid ;
        background-color: palegreen;
      }

      svg{
        font-size: 2rem;
        border: none;
      
      }
    }
  
}
`

export default ChatInput