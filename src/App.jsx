import { useState } from 'react'
import Login from './components/Login/Login'
import Main from './components/Main/Main'
import io from "socket.io-client";

const socket = io.connect("https://realtime-chat-111.herokuapp.com/");

function App() {
  
  const [login, setLogin] = useState('false');
  const [memberList, setMemberList] = useState([])
  const [username, setUsername] = useState("");

  return (
    <div className="App">
      {login == true ? (
        <Main
          socket={socket}
          memberList={memberList}
          setMemberList={setMemberList}
          username={username}
        />
      ) : (
        <Login
          memberList={memberList}
          setLogin={setLogin}
          socket={socket}
          setMemberList={setMemberList}
          setUsername={setUsername}
        />
      )}
    </div>
  );
}

export default App
