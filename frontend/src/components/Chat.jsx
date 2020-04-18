import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMessages } from "../actions";
import { makeStyles } from "@material-ui/core/styles";
import { Container, TextField, Button } from "@material-ui/core";

import Message from "./Message.jsx";

const useStyles = makeStyles((theme) => ({
  chatContainer: {
    height: "calc(100vh - 64px)",
  },
  messages: { height: "80%" },
  send: {
    display: "flex",
    justifyContent: "space-around",
    marginTop: "24px",
  },
  text: {
    width: "100%",
  },
}));

const Chat = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const messages = useSelector((state) => state.messages);
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    dispatch(fetchMessages());
  }, [dispatch]);

  const handleMessage = () => {
    console.log(newMessage);
  };

  const RenderMessages = () => {
    if (!messages.messages) return null;
    return messages.messages.map((mess) => (
      <Message
        username={mess.username}
        message={mess.message}
        timestamp={mess.timestamp}
      />
    ));
  };

  return (
    <Container className={classes.chatContainer} maxWidth="lg">
      <div className={classes.messages}>
        <RenderMessages />
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
