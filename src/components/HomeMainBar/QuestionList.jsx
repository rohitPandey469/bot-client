import React from "react";
import Questions from "./Questions";

const QuestionList = ({ questionsList }) => {
  return (
    <>
      {questionsList?.map((question) => (
        <Questions key={question?.id} question={question} />
      ))}
    </>
  );
};

export default QuestionList;
