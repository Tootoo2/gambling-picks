import React from "react";

const Message = ({ username, message, timestamp }) => {
  return (
    <div>
      {username}
      {message}
    </div>
  );
};

export default Message;
