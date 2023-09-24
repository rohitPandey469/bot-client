import axios from "axios";

const API = axios.create({ baseURL: "https://bot-server-kohs.onrender.com" });

// with each req from the frontend we are intercepting it
// modifying the headers
// here I can go ahead and attach headers
// sending token with each req to database
API.interceptors.request.use((req) => {
  if (localStorage.getItem("Profile")) {
    req.headers.authorization = `Bearer ${
      JSON.parse(localStorage.getItem("Profile")).token
    }`;
  }
  return req;
});

// similar to postman - sending req in same format as postman
export const textQuery = (text) => API.post("/api/dialogflow/textQuery", text);
export const eventQuery = (event) =>
  API.post("/api/dialogflow/eventQuery", event);

// auth
export const register = async (data) => API.post("/user/register", data);
export const sentOtp = async (data) => API.post("/user/sendOtp", data);
export const userVerify = async (data) => API.post("/user/login", data);

// payment
export const makePayment = async (data) =>
  API.post("/api/create-checkout-session", data);

// questions
export const postQuestion = (questionData) =>
  API.post("/questions/ask", questionData);
export const getAllQuestions = () => API.get("/questions/get");
export const deleteQuestion = (id) => API.delete(`/questions/delete/${id}`);
export const voteQuestion = (id, value, userId) =>
  API.patch(`/questions/vote/${id}`, { value, userId });

// answers
export const postAnswer = (id, noOfAnswers, answerBody, userAnswered, userId) =>
  API.patch(`/answers/post/${id}`, {
    noOfAnswers,
    answerBody,
    userAnswered,
    userId,
  });

export const deleteAnswer = (id, answerId, noOfAnswers) =>
  API.patch(`/answers/delete/${id}`, { answerId, noOfAnswers });

// users
export const getAllUsers = () => API.get("/user/getAllUsers");
export const updateProfile = (id, updateData) =>
  API.patch(`/user/update/${id}`, updateData);
