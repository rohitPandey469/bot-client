import React from "react";
import QuestionDetails from "./QuestionDetails";
import Header from "../../components/Header/Header";

const DisplayQuestion = () => {
  return (
    <>
    <Header/>
      <div style={{paddingTop:"80px"}}>
        <QuestionDetails />
      </div>
    </>
  );
};

export default DisplayQuestion;
