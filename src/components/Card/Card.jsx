import React from "react";
import { Link } from "react-router-dom";

const Card = ({ cardInfo }) => {
  return (
    <div
      className="chatbot-div"
      style={{ display: "flex", border: "1px solid red" }}
    >
      <div className="chatbot-div">
        <img
          className="chatbot-img"
          src={cardInfo.fields.image.stringValue}
          alt=""
        />
        <Link className="chatbot-Link" to={cardInfo.fields.link.stringValue}>
          link
        </Link>
        <p className="chatbot-p">{cardInfo.fields.description.stringValue}</p>
      </div>
    </div>
  );
};

export default Card;
