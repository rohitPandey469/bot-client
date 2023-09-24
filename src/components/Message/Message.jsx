import React from "react";

const Message = ({ title, description }) => {
  const Avatar = title === "bot" ? "robot" : "user";
  window.scrollTo(0, document.body.scrollHeight);

  return (
    <p className={title === "bot" ? "user chatbot-p" : "user_msg chatbot-p"}>
      <span className="chatbot-span" style={{color:"#cfc5c5"}}>
        <b>{title}</b>
      </span>
      <span className="chatbot-span" style={{color:"whitesmoke"}}>:</span>
      <span className="chatbot-span" style={{color:"white"}}>{description}</span>
    </p>
  );
};

export default Message;
