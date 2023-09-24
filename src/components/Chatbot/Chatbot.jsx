import React, { useEffect, useState } from "react";
import { textQueryAction, eventQueryAction } from "../../actions/queries";
import { useDispatch, useSelector } from "react-redux";
import Message from "../Message/Message";
import Card from "../Card/Card";
import "./Chatbot.css";
import { useNavigate } from "react-router-dom";
import { setCurrentUser } from "../../actions/currentUser";
import decode from "jwt-decode"
import Header from "../Header/Header";

const Chatbot = () => {
  /////////////////For protected Routes////////////////
  const dispatch = useDispatch();
  var User = useSelector((state) => state.currentUserReducer);
  const navigate = useNavigate();
  useEffect(() => {
    const token = User?.token;
    // console.log("User.token", User?.token);
    if (token) {
      const decodedToken = decode(token);
      // logging out after 1hr
      // console.log(decodedToken.exp * 1000);
      if (decodedToken.exp * 1000 < new Date().getTime()) {
        dispatch({ type: "LOGOUT" });
        navigate("/login");
        dispatch(setCurrentUser(null));
      }
    }
    // On refreshing the profile is disappearing
    // so dispatch here on each refersh
    dispatch(setCurrentUser(JSON.parse(localStorage.getItem("Profile"))));
  }, [User?.token]);

  useEffect(() => {
    if (User === null) {
      navigate("/login");
    }
  }, [User]);
  //////////////////////////////////////////////////////////

  useEffect(() => {
    eventQuery("welcomeToMyBot");
  }, []);

  const [text, setText] = useState("");
  const [isTyping, setIsTyping] = useState(true);

  // with the help of redux toolkit - pulling out the data from redux
  const msgs = useSelector((state) => state?.queriesReducer.messages);
  useEffect(() => {
    window.scrollTo(0, document.body.scrollHeight);
  }, [msgs]);
  useEffect(() => {
    setIsTyping(false);
  }, [msgs.length]);

  const textQuery = async (text) => {
    // called an action
    setIsTyping(true);
    dispatch(textQueryAction(text));
  };

  const eventQuery = async (event) => {
    // called an action
    setIsTyping(true);
    dispatch(eventQueryAction(event));
  };

  const handleSubmit = (e) => {
    setIsTyping(true);
    e.preventDefault();
    if (text == "") {
      return alert("Type something first");
    } else {
      // send request to text query route
      textQuery(text);
    }
    setText("");
  };

  const renderCards = (cards) => {
    return cards.map((card, i) => <Card key={i} cardInfo={card.structValue} />);
  };

  const renderOneMsg = (msg, i) => {
    // we need some condn to separate msgs kind

    // template for normal text
    if (msg.content && msg.content.text && msg.content.text.text) {
      return (
        <Message key={i} title={msg.who} description={msg.content.text.text} />
      );
    }
    // template for card or custom payload
    else if (
      msg.content &&
      msg.content.payload &&
      msg.content.payload.fields.card
    ) {
      return (
        <div>
          {renderCards(msg.content.payload.fields.card.listValue.values)}
        </div>
      );
    }
  };

  const renderMsg = (msgs) => {
    if (msgs) {
      return msgs.map((msg, i) => {
        return renderOneMsg(msg, i);
      });
    } else {
      return null;
    }
  };

  return (
    <>
    <Header/>
    <main style={{padding:"70px 5px"}} className="chatbot-main"> 
      <h1 className="chatbot-h1">Chatbot</h1>
      <section className="chatbot-section">{renderMsg(msgs)}</section>
      <div className={isTyping ? "" : "hide"}>
        <p className="chatbot-p">
          <i>{isTyping ? "Typing" : ""}</i>
        </p>
      </div>
      <form className="chatbot-form" onSubmit={handleSubmit}>
        <input 
          style={{ color: "white" }}
          className="form-input chatbot-input"
          placeholder="Send a message..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          type="text"
        />
      </form>
    </main>
    </>
  );
};

export default Chatbot;
