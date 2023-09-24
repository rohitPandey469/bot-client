import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./Pages/Home/Home";
import Login from "./Pages/Login/Login";
import Register from "./Pages/Register/Register";
import Otp from "./Pages/Otp/Otp";
import Page404 from "./Pages/Page404/Page404";
import Chatbot from "./components/Chatbot/Chatbot";
import StripePayment from "./Pages/StripePayment/StripePayment";
import Success from "./Pages/Success/Success";
import Cancel from "./Pages/Cancel/Cancel";
import AskQuestion from "./Pages/AskQuestion/AskQuestion";
import Questions from "./Pages/Questions/Questions";
import DisplayQuestion from "./Pages/Questions/DisplayQuestion";
import UserProfile from "./Pages/UserProfile/UserProfile";
import Info from "./Pages/Info/Info";

// import Start from "./components/Start/Start"

const AllRoutes = () => {
  return (
    <>
      <Routes>
        {/* Public */}
        {/* <Route path="/" element={<Start/>}/> */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/user/otp" element={<Otp />} />
        <Route path="/info" element={<Info />} />

        {/* Protected */}
        <Route path="/chatbot" element={<Chatbot />} />
        <Route path="/checkout" element={<StripePayment />} />
        <Route path="/checkout/success" element={<Success />} />
        <Route path="/checkout/cancel" element={<Cancel />} />
        <Route path="/AskQuestion" element={<AskQuestion />} />
        <Route path="/Questions" element={<Questions />} />
        <Route path="/Questions/:id" element={<DisplayQuestion />} />
        <Route path="/Users/:id" element={<UserProfile />} />
        {/* The 404 page */}
        <Route path="*" element={<Page404 />} />
      </Routes>
    </>
  );
};

export default AllRoutes;
