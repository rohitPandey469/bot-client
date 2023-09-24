import React, { useState, useEffect } from "react";
import { setCurrentUser } from "../../actions/currentUser";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import decode from "jwt-decode"
import upvote from "../../assets/sort-up.svg";
import downvote from "../../assets/sort-down.svg";
import { Link } from "react-router-dom";
import Avatar from "../../components/Avatar/Avatar";
import DisplayAnswer from "./DisplayAnswer";
import "./Questions.css";
import { useDispatch, useSelector } from "react-redux";
import { postAnswer } from "../../actions/question";
import moment from "moment";

import copy from "copy-to-clipboard";
import { deleteQuestion, voteQuestion } from "../../actions/question";

const QuestionDetails = () => {
  const { id } = useParams(); // id type - string

  const questionsList = useSelector((state) => state.questionsReducer);

  // var questionsList = [
  //   {
  //     _id: 1,
  //     upVotes: 3,
  //     downVotes: 1,
  //     noOfAnswers: 2,
  //     questionTitle: "What is a function?",
  //     questionBody: "It meant to be",
  //     questionTags: ["java", "node js", "react js"],
  //     userPosted: "mano",
  //     askedOn: "Jan 1",
  //     tags: ["java", "python", "c"],
  //     userId: 1,
  //     answer: [
  //       {
  //         answerBody: "Answering",
  //         userAnswered: "kumar",
  //         answeredOn: "jan 2",
  //         userId: 2,
  //       },
  //     ],
  //   },
  // ];
  const navigate = useNavigate();
  const dispatch = useDispatch();

  /////////////////For protected Routes////////////////
  var User = useSelector((state) => state.currentUserReducer);
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

  const [answer, setAnswer] = useState("");
  const handlePostAns = (e, answerLength) => {
    e.preventDefault();
    // if (User === null) {
    //   navigate("/login");
    // }
    // else {
    if (answer == "") {
      alert("Enter an answer before submitting");
    } else {
      // trigger the action - postAnswer
      dispatch(
        postAnswer({
          id,
          noOfAnswers: answerLength + 1,
          answerBody: answer,
          userAnswered: User?.result.name,
          userId: User?.result._id,
        })
      );
      setAnswer("");
    }
    // }
  };

  const location = useLocation();
  const url = "https://bot-stack.netlify.app/";
  const handleShare = (e) => {
    copy(url + location.pathname);
    alert("Copied url : " + url + location.pathname);
  };

  const handleDelete = () => {
    dispatch(deleteQuestion(id, navigate));
  };

  const handleUpVote = () => {
    dispatch(voteQuestion(id, "upVote", User?.result?._id));
  };

  const handleDownVote = () => {
    dispatch(voteQuestion(id, "downVote", User?.result?._id));
  };

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      {questionsList.data === null ? (
        <h1>Loading...</h1>
      ) : (
        <>
          {questionsList.data
            .filter((question) => question._id == id)
            .map((question) => (
              <div
                style={{ width: "100vw", maxWidth: "720px" }}
                key={question._id}
              >
                <section
                  style={{ width: "100%" }}
                  className="question-details-container"
                >
                  <h1>Q&gt;{question.questionTitle}</h1>
                  <div className="question-details-container-2">
                    <div className="question-votes">
                      <img
                        src={upvote}
                        alt="upvote"
                        width="18"
                        onClick={handleUpVote}
                      />
                      <p>{question.upVote.length - question.downVote.length}</p>
                      <img
                        src={downvote}
                        alt="downvote"
                        width="18"
                        onClick={handleDownVote}
                      />
                    </div>
                    <div style={{ width: "100%" }}>
                      <i>
                        Answer the question asked by the user or ask your{" "}
                        <Link style={{ textDecoration: "none" }} to="/chatbot">
                          {" "}
                          bot
                        </Link>
                      </i>
                    </div>
                  </div>
                </section>
                {question.noOfAnswers !== 0 && (
                  <section>
                    <h3>{question.noOfAnswers} Answers </h3>
                    <DisplayAnswer
                      key={question._id}
                      question={question}
                      handleShare={handleShare}
                    />
                  </section>
                )}
                <section className="post-ans-container">
                  <h3>Your Answer</h3>
                  <form
                    onSubmit={(e) => handlePostAns(e, question.answer.length)}
                  >
                    <textarea
                      name=""
                      id=""
                      cols="30"
                      rows="10"
                      value={answer}
                      onChange={(e) => setAnswer(e.target.value)}
                    ></textarea>
                    <br />
                    <input
                      type="submit"
                      className="post-ans-btn"
                      value="Post Your Answer"
                    />
                  </form>

                  <Link
                    to="/AskQuestion"
                    style={{ textDecoration: "none", color: "#009dff" }}
                  >
                    Ask your own question
                  </Link>
                </section>
              </div>
            ))}
        </>
      )}
    </div>
  );
};

export default QuestionDetails;
