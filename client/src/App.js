import "./App.css";
import io from "socket.io-client";
import { useState } from "react";
import Chat from "./Component/Chat";

import FacebookIcon from '@mui/icons-material/Facebook';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';


const socket = io.connect("http://localhost:3001");

function App() {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const [showChat, setShowChat] = useState(false);

  const joinRoom = () => {
    if (username !== "" && room !== "") {
      socket.emit("join_room", room);
      setShowChat(true);
    }
  };

  return (
    <div className="App">
      {!showChat ? (
        <div className="joinChatContainer">
          <div style={{justifyContent:"center",display:"flex",marginBottom:"20px"}}>
      <div style={{color:"Blue"}}><FacebookIcon/></div>
      <div style={{color:"Blue",fontSize:"40px",marginBottom:"20px"}}>Facebook</div>
    </div>
      <p id="vv">Log in using Facebook account. <br />
        You'll be able to switch between <br />
        accounts to see your new messages. <br />
      </p>

      <div className="vats1">
          <input
            type="text"
            placeholder="Email or phone number"
            onChange={(event) => {
              setUsername(event.target.value);
            }}
            />
            </div>

          <div className="vats1">
          <input
            type="text"
            placeholder="Password"
            onChange={(event) => {
              setRoom(event.target.value);
            }}
            />
            </div>
          <div className="flex-container">
            <div><CheckCircleIcon/></div>
            <div id="vvv">Require a password when switching to this <br />
            account from this device</div>
          </div>
          
      <div className='vats'><button onClick={joinRoom}>ADD ACCOUNT</button></div>
        </div>
      ) : (
        <Chat socket={socket} username={username} room={room} />


      )}
    </div>
  );
}

export default App;
