import React from 'react'
import styled from "styled-components"
import { useEffect, useState } from 'react';


function Welcome({ current_user }) {

    const [current_username, set_current_username] = useState(undefined);

    // useEffect(() => {

    //     const set_username_func = async () => {
    //         if (current_user) {
    //             set_current_username(current_user.user.username);
    //         }
    //     }
    //     set_username_func();

    // }, [current_user]);

    return (
        <>{
            (
                <Container>

                    <img src="wave.gif" alt="gif" />
                    <div className='welcome-msg'>

                        <h1>Welcome <span>{current_user.user.username}</span>
                        </h1>
                        <h3>happy Chatting !</h3>
                    </div>
                </Container>
            )
        }
        </>
    )
}

const Container = styled.div`
display: flex;
flex-direction: column;
    color: white;
    justify-content: center;
    align-items: center;
    gap:1rem;

    img{
        height: 12rem;
    }

    

.welcome-msg{
    text-align: center;
    span{
        color: orange;
        font-size: 3rem;
    }
}

`


export default Welcome