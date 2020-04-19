import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMessages, sendMessage } from "../actions";
import { makeStyles } from "@material-ui/core/styles";
import { Container, TextField, Button } from "@material-ui/core";

import socket from "socket.io-client";

import Message from "./Message.jsx";

const useStyles = makeStyles((theme) => ({
  chatContainer: {
    flex: 1,
    minHeight: "0px",
    display: "flex",
    flexDirection: "column",
  },
  messages: {
    flex: 1,
    overflowY: "auto",
    // scrollbarWidth: "none",
  },
  send: {
    display: "flex",
    justifyContent: "space-around",
    margin: "24px",
  },
  reverseColumn: {
    display: "flex",
    flexDirection: "column-reverse",
  },
  text: {
    width: "100%",
  },
}));

const Chat = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const messages = useSelector((state) => state.messages);
  const username = useSelector((state) => state.user.username);
  const [newMessage, setNewMessage] = useState("");
  const [socketMessage, setSocketMessage] = useState([]);

  const messagesEndRef = useRef(null);

  useEffect(() => {
    dispatch(fetchMessages());
  }, [dispatch]);

  useEffect(() => {
    const io = socket("http://localhost:3090");
    io.on("postMessage", (data) => {
      console.log(data);
      setSocketMessage((prev) => [...prev, data]);
    });
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView();
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, socketMessage]);

  const handleMessage = () => {
    dispatch(sendMessage(username, newMessage));
    setNewMessage("");
  };

  const RenderMessages = () => {
    if (!messages.messages) return null;
    return messages.messages.map((mess) => (
      <Message
        key={mess.timestamp}
        username={mess.username}
        message={mess.message}
        timestamp={mess.timestamp}
      />
    ));
  };

  const RenderSocketMessages = () => {
    return socketMessage.map((mess) => (
      <Message
        key={mess.timestamp}
        username={mess.username}
        message={mess.message}
        timestamp={mess.timestamp}
      />
    ));
  };

  return (
    <Container className={classes.chatContainer} maxWidth="lg">
      <div className={classes.messages}>
        <div className={classes.reverseColumn}>
          <div>
            <RenderSocketMessages />
          </div>
          <div className={classes.reverseColumn}>
            <RenderMessages />
          </div>
        </div>
        <div ref={messagesEndRef} />
      </div>

      <div className={classes.send}>
        <TextField
          className={classes.text}
          variant="outlined"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <Button variant="contained" color="primary" onClick={handleMessage}>
          Send
        </Button>
      </div>
    </Container>
  );
};

export default Chat;
