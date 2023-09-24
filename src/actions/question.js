import * as api from "../api";

export const askQuestion = (questionData, navigate) => async (dispatch) => {
  try {
    console.log("reached",questionData)
    const { data } = await api.postQuestion(questionData);
    dispatch({ type: "POST_QUESTION", payload: data });
    // to show question in question feed just after asking in question section
    dispatch(fetchAllQuestion());
    navigate("/Questions");
  } catch (error) {
    console.log(error);
  }
};

export const deleteQuestion = (id, navigate) => async (dispatch) => {
  try {
    const { data } = await api.deleteQuestion(id);
    dispatch(fetchAllQuestion());
    navigate("/Questions");
  } catch (err) {
    console.log(err);
  }
};

export const voteQuestion = (id, value, userId) => async (dispatch) => {
  try {
    const { data } = await api.voteQuestion(id, value, userId);
    dispatch(fetchAllQuestion());
  } catch (err) {
    console.log(err);
  }
};

export const fetchAllQuestion = () => async (dispatch) => {
  try {
    const { data } = await api.getAllQuestions();
    dispatch({ type: "FETCH_ALL_QUESTIONS", payload: data });
  } catch (err) {
    console.log(err);
  }
};

export const postAnswer = (answerData) => async (dispatch) => {
  const { id, noOfAnswers, answerBody, userAnswered, userId } = answerData;
  try {
    const { data } = await api.postAnswer(
      id,
      noOfAnswers,
      answerBody,
      userAnswered,
      userId
    );
    // store it to the redux toolkit by dispatching
    dispatch({ type: "POST_ANSWER", payload: data });
    // updating the home page
    dispatch(fetchAllQuestion());
  } catch (err) {
    console.log(err);
  }
};

export const deleteAnswer = (id, answerId, noOfAnswers) => async (dispatch) => {
  try {
    await api.deleteAnswer(id, answerId, noOfAnswers);
    dispatch(fetchAllQuestion());
  } catch (err) {
    console.log(err);
  }
};
