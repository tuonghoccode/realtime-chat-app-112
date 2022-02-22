import { Input, Button } from '@nextui-org/react';
import React, {useRef, useState} from 'react'
import './login.scss'
const Login = ({ setLogin, socket,setUsername }) => {
  const username = useRef("");
  const joinRoom = async () => {
    if (username.current.value){
      setLogin(true);
      setUsername(username.current.value)
      await socket.emit("join_room", username.current.value);
    }
  };
  return (
    <div className="login">
      <div className="title">
        <h1>Welcome to my Chat App</h1>
      </div>
      <div className="form">
        <Input
          labelPlaceholder="Enter your name"
          status="default"
          ref={username}
        />
        <Button auto color="gradient" rounded bordered onClick={joinRoom}>
          Join
        </Button>
      </div>
    </div>
  );
};

export default Login