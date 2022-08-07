import React, { useEffect, useState } from "react";
import ScrollToBottom from "react-scroll-to-bottom";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import SendIcon from '@mui/icons-material/Send';
import CallIcon from '@mui/icons-material/Call';
import VideocamIcon from '@mui/icons-material/Videocam';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import CropOriginalIcon from '@mui/icons-material/CropOriginal';
import MicIcon from '@mui/icons-material/Mic';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt';
import VideoCall from './VideoCall'





function Chat({ socket, username, room }) {
  const [currentMessage, setCurrentMessage] = useState("");
  const [messageList, setMessageList] = useState([]);

  const sendMessage = async () => {
    if (currentMessage !== "") {
      const messageData = {
        room: room,
        author: username,
        message: currentMessage,
        time:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes(),
      };

      await socket.emit("send_message", messageData);
      setMessageList((list) => [...list, messageData]);
      setCurrentMessage("");
    }
  };

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessageList((list) => [...list, data]);
    });
  }, [socket]);

    

  return (
    <div className="App">

    <div className="chat-window">
      <div className="chat-header">
        <div>
          <div id="hs"><ArrowBackIcon/></div>
        <div id="hh"><AccountCircleIcon/></div>
        <p>ONLINE</p>
        <div id="hhh"><CallIcon/></div>
        <div id="hhs" ><VideocamIcon/></div>
        <div id="hb"><ErrorOutlineIcon/></div>
        </div>
      </div>
      <div className="chat-body">
        <ScrollToBottom className="message-container">
          {messageList.map((messageContent) => {
            return (
              <div
                className="message"
                id={username === messageContent.author ? "you" : "other"}
                >
                <div>
                  <div className="message-content">
                    <p>{messageContent.message}</p>
                  </div>
                  <div className="message-meta">
                    <p id="time">{messageContent.time}</p>
                    <p id="author">{messageContent.author}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </ScrollToBottom>
      </div>
      <div className="chat-footer">
        <div id="aaa"><AddCircleIcon/></div>
        <div id="aab"><CameraAltIcon/></div>
        <div id="aac"><CropOriginalIcon/></div>
        <div id="aad"><MicIcon/></div>
        <div id="abcd"><SentimentSatisfiedAltIcon/></div>
        <div  id="abc">
        <input
          type="text"
          value={currentMessage}
          placeholder="Aa"
          onChange={(event) => {
            setCurrentMessage(event.target.value);
          }}
          onKeyPress={(event) => {
            event.key === "Enter" && sendMessage();
          }}
        />
        </div>
        <button onClick={sendMessage}><SendIcon/></button>
      </div>
    </div>

    <VideoCall/>

          </div>
  );
}


export default Chat;
