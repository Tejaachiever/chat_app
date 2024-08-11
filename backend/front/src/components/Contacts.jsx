import React, { useEffect, useState } from 'react'
import styled from "styled-components"

function Contacts({ contacts, current_user, change_chat }) {

    const [current_username, set_current_username] = useState(undefined);
    const [current_selected, set_current_selected] = useState(undefined);

     const updateCurrentSelected = (newValue) => {
        set_current_selected(newValue);
      };


    useEffect(() => {

        const set_username_func = async () => {
            if (current_user) {
                set_current_username(current_user.user.username);
            }
        }
        set_username_func();

    }, [current_user]);

    const change_current_chat = (index, contact) => {

        set_current_selected(index); // will set variable in contacts page (here)

        change_chat(contact);// will send current selected contact array to chat.jsx page in current_chat variable

    }





    return (
        <>
            {
                current_username && (
                    <Container>
                        <div className="brand">
                            <h3>chatX</h3>
                        </div>
                        <div className="all-contacts">
                            {
                                contacts.map(
                                    (contact, index) => {
                                        return (
                                            


                                                <div
                                                    onClick={() => change_current_chat(index, contact)}

                                                    key={index}

                                                    className={`contact ${current_selected === index ? "selected" : ""}`}>

                                                    <div className="avatar">
                                                       {contact.username.slice(0,1)}
                                                    </div>
                                                    <div className="username">
                                                        <h3>
                                                            {contact.username}
                                                        </h3>
                                                    </div>
                                                </div>
                                            
                                        )

                                    }
                                )
                            }
                        </div>

                        <div className="current-user">
                            <div className="avatar">
                               {current_username.slice(0,1)}
                            </div>
                            <div className="username">
                                <h2>
                                    {current_username}
                                </h2>
                            </div>
                        </div>
                    </Container>
                )
            }
        </>
    )
}

const Container = styled.div`

display: grid;
grid-template-rows: 10% 75% 15%;
overflow: hidden;
background-color: #f7fffebd;
border-radius: 1rem 0 0 1rem;

.brand{
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1rem;
    background-color:#476c7b;
    h3{
    color: white;
    background-color: black;

    border: 0.2rem solid #fff;
  border-radius: 2rem;
  padding: 0.2rem;

  box-shadow: 0 0 .2rem #fff,
            0 0 .2rem #fff,
            0 0 0.8rem #bc13fe,
        
            inset 0 0 0.3rem #bc13fe; 
            // to control light within border
}
}
.all-contacts{
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow-x: hidden;
    overflow-y: auto;
    gap: 0.8rem;

    &::-webkit-scrollbar{
        width: 0.3rem;
        &-thumb{
            background-color:  #5c6d6b ;
            width: 0.5rem;
            border-radius: 1rem;
        }
    }

 /* .contact-cover{
    width: 90%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0.3rem 0rem;
    background-color: #3b8f96;
 } */

    .contact{
        background-color: #3b8f96;
        min-height: 3rem;
        width: 85%;
        padding: 1.75rem 0.5rem;
        border-radius: 0.5rem ;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        gap: 0.3rem;
        margin: 0.4rem;
        cursor: pointer;
        transition: 0.3s ease-in-out;

        @media screen and (max-width: 1080px) {
    width:80%;
  }

        &:hover{
            background-color: #0d575e ;
        }
        
        .avatar {
        img {
          height: 2.5rem;
          /* max-width:2.5rem ; */
          max-inline-size: 100%;}

          height: 2rem;
          width: 2rem;
          background-color: #cd960c;
          border-radius: 1rem ;
          display: flex;
          align-items: center;
          justify-content: center;

        }

        .username {
        h3 {
            font-size: 1.4rem;
          color: white;
          @media screen and (max-width: 1080px) {
    
  }

        }
      }
      }

      .selected{
        background-color: #01b78a;
        width: 95%;
      }

     

    

}

.current-user{
    background-color: #847f7f;
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 0.3rem;
    border: solid black ;
    

    border-radius: 0 0 0 1rem;

    .avatar {
      img {
        height: 3rem;
        max-inline-size: 100%; //???
      }

      height: 2.2rem;
      width: 2.2rem;
      background-color: #01b78a;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 1rem;
    }
    .username {
      h2 {
        color: white;
      }
    }
    @media screen and (min-width: 720px) and (max-width: 1080px) 
    {
      gap: 0.5rem;
      .username {
        h2 {
          font-size: 1rem;
        }
      }
    }
}
    
`


export default Contacts