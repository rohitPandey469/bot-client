import React, { useEffect } from "react";
import "./HomeMainbar.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import QuestionList from "./QuestionList";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import decode from "jwt-decode"
import { setCurrentUser } from "../../actions/currentUser";

const HomeMainbar = () => {
  // questionsList.data is having the value sent from backend
  let questionsList = useSelector((state) => state.questionsReducer);
  console.log("questionList", questionsList);

  //   var questionsList = {
  //     data: [
  //       {
  //         _id: 1,
  //         upVotes: 3,
  //         downVotes: 1,
  //         noOfAnswers: 2,
  //         questionTitle: "What is a function?",
  //         userPosted: "mano",
  //         askedOn: "Jan 1",
  //         tags: ["java", "python", "c"],
  //         userId: 1,
  //         answer: [
  //           {
  //             answerBody: "Answering",
  //             userAnswered: "kumar",
  //             answeredOn: "jan 2",
  //             userId: 2,
  //           },
  //         ],
  //       },
  //       {
  //         _id: 1,
  //         upVotes: 3,
  //         downVotes: 1,
  //         noOfAnswers: 2,
  //         questionTitle: "What is a function?",
  //         userPosted: "mano",
  //         askedOn: "Jan 1",
  //         tags: ["java", "python", "c"],
  //         userId: 1,
  //         answer: [
  //           {
  //             answerBody: "Answering",
  //             userAnswered: "kumar",
  //             answeredOn: "jan 2",
  //             userId: 2,
  //           },
  //         ],
  //       },
  //       {
  //         _id: 1,
  //         upVotes: 3,
  //         downVotes: 1,
  //         noOfAnswers: 2,
  //         questionTitle: "What is a function?",
  //         userPosted: "mano",
  //         askedOn: "Jan 1",
  //         tags: ["java", "python", "c"],
  //         userId: 1,
  //         answer: [
  //           {
  //             answerBody: "Answering",
  //             userAnswered: "kumar",
  //             answeredOn: "jan 2",
  //             userId: 2,
  //           },
  //         ],
  //       },
  //     ],
  //   };

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

  const checkAuth = () => {
    if (User === null) {
      navigate("/login");
    } else {
      navigate("/AskQuestion");
    }
  };

  const location = useLocation();
  return (
    <div
      style={{
        maxWidth: "1000px",
        margin: "0px auto",
        padding:"80px 8px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <div className="main-bar-header">
        {location.pathname === "/" ? (
          <h1>Top Questions</h1>
        ) : (
          <h1>All Questions</h1>
        )}
        <button title="Ask your own question" onClick={() => checkAuth()} className="ask-btn">
          Doubt
        </button>
      </div>
      <div>
        {questionsList.data === null ? (
          <p>Loading...</p>
        ) : (
          <>
            <p>{questionsList?.data?.length} questions</p>
            <QuestionList questionsList={questionsList?.data} />
          </>
        )}
      </div>
    </div>
  );
};

export default HomeMainbar;
