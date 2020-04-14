import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMessages } from "../actions";

const Chat = () => {
  const dispatch = useDispatch();
  const messages = useSelector((state) => state.messages);

  useEffect(() => {
    dispatch(fetchMessages());
  }, [dispatch]);

  const RenderMessages = () => {
    if (!messages.messages) return null;
    return messages.messages.map((mess) => (
      <div>
        {mess.username}
        {mess.message}
      </div>
    ));
  };

  return (
    <div style={{ display: "flex", flexDirection: "column-reverse" }}>
      <RenderMessages />
    </div>
  );
};

export default Chat;
