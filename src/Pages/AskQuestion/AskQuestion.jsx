import React, { useState } from "react";
import "./AskQuestion.css";
import { useEffect } from "react";
import { setCurrentUser } from "../../actions/currentUser";
import decode from "jwt-decode";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { askQuestion } from "../../actions/question";
import Header from "../../components/Header/Header";
import { ToastContainer, toast } from "react-toastify";

const AskQuestion = () => {
  const [questionTitle, setQuestionTitle] = useState("");

  /////////////////For protected Routes////////////////
  const dispatch = useDispatch();
  var User = useSelector((state) => state.currentUserReducer);
  const navigate = useNavigate();
  // console.log(User);
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

  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success("Question Posted")

    // dispatch it to the backend
    dispatch(
      askQuestion(
        {
          questionTitle,
          userPosted: User?.result?.fname,
          userId: User?.result._id,
        },
        navigate
      )
    );
  };

  const handleEnter = (e) => {
    if (e.key === "Enter") {
      setQuestionTitle(questionTitle + "\n");
    }
  };
  return (
    <>
      <Header />
      <div style={{width:"100vw",height:"100%"}} className="ask-question">
        <div
          style={{
            width: "360px",
            height: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          className="ask-ques-container"
        >
          <form onSubmit={(e) => handleSubmit(e)}>
            <div className="ask-form-container">
              <label htmlFor="ask-ques-title">
                <h4>Your Question</h4>
                <p>
                  There are many questions bot won't be able to answer, so you
                  can ask here.
                </p>
                <textarea
                  style={{
                    width: "100%",
                  }}
                  name=""
                  id="ask-ques-body"
                  cols=""
                  rows="10"
                  autoComplete="off"
                  value={questionTitle}
                  onChange={(e) => setQuestionTitle(e.target.value)}
                  onKeyPress={handleEnter}
                ></textarea>
              </label>
            </div>
            <button
              style={{
                width: "100%",
                marginTop: "0",
              }}
              type="submit"
              value=""
              className="review-btn"
            >
              Ask your question
            </button>
          </form>
          <ToastContainer/>
        </div>
      </div>
    </>
  );
};

export default AskQuestion;
