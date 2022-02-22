import React, { useEffect, useState } from "react";
import "./main.scss";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import { Avatar, Divider, Input } from "@nextui-org/react";
import avt from "../../assets/image/avt.jpg";
import AttachmentIcon from "@mui/icons-material/Attachment";
import SendIcon from "@mui/icons-material/Send";
import UserItem from "../UserItem/UserItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";

const Main = ({ socket, memberList, setMemberList, username }) => {
  const [curMessage, setCurMessage] = useState("");
  const [renderMess, setRenderMess] = useState([]);
  const [totalMem, setTotalMem] = useState()
  const [typing, setTyping] = useState('');
 
  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      sendMessage()
    }
  };

  const focusInput = () => {
    socket.emit('typing-message', username)
  }

   const blurInput = () => {
     socket.emit("typing-message", '');
   };

  const sendMessage = () => {
    if (curMessage) {
      const timestamps =
        new Date(Date.now()).getHours() +
        ":" +
        new Date(Date.now()).getMinutes();

      socket.emit("send_message", {
        content: curMessage,
        timestamps: timestamps,
      });
      setCurMessage("");
    }
  };

  useEffect(() => {
    socket.on("render_user", (data,username) => {
      setMemberList(data);
      setTotalMem(data.length)
      socket.Username = username
    });
    socket.on("recive_message", (data) => {
      setRenderMess((state) => [
        ...state,
        {
          content: data.content,
          timestamps: data.timestamps,
          id: data.id,
          username: data.username
        },
      ]);
    });

    
  }, [socket]);
  socket.on("render-typing", data => setTyping(data));
  return (
    <div className="main">
      <div className="main-box">
        <div className="header">
          <div className="header__user">
            <div className="avatar">
              <Avatar src={avt} bordered color="primary" />
            </div>
            <div className="info">
              <div className="name">Lam Tuong</div>
              <div className="status">Online</div>
            </div>
          </div>
          <div className="header__call">
            <LocalPhoneIcon />
            <span>Call</span>
          </div>
        </div>
        <Divider />
        <div className="render">
          {renderMess.map((item, key) => (
            <div
              className={`message ${socket.id != item.id ? "friend" : ""} `}
              key={key}
            >
              <pdiv className="message_name">{item.username}</pdiv>
              <div className="message_item">
                <Avatar src={avt} squared />
                <div className="text">
                  <div className="content">{item.content}</div>
                  <div className="timestamps">{item.timestamps}</div>
                </div>
              </div>
            </div>
          ))}
          {typing ? (
            <div class="typing">     
              <div class="type type-w">{typing}</div>
              <div class="type type-a">đang</div>
              <div class="type type-v">nhập</div>
              <div class="type type-e">...</div>
            </div>
          ) : null}
        </div>
        <Divider />
        <div className="form">
          <AttachmentIcon className="send-file" />
          <div className="input">
            <Input
              placeholder="text"
              fullWidth
              color="default"
              contentRight={<SendIcon className="input-send" />}
              animated={false}
              contentClickable
              onContentClick={sendMessage}
              value={curMessage}
              onChange={(e) => setCurMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              onFocus={focusInput}
              onBlur={blurInput}
            />
          </div>
        </div>
      </div>
      <div className="member">
        <div className="header">
          <h2>Member</h2>
          <MoreVertIcon className="option" />
        </div>
        <Divider />
        <div className="member__team">
          Team Members <span className="member-counter">{totalMem}</span>
        </div>
        <div className="member__list">
          {memberList.map((item, key) => (
            <div key={key}>
              <UserItem src={avt} name={item} role="Member" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Main;
