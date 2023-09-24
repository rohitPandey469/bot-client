import React from "react";
import "../../styles/mix.css";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import Spinner from "react-bootstrap/Spinner";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { sentOtp } from "../../actions/auth";
import { useDispatch } from "react-redux";

const Login = () => {
  const [email, setEmail] = useState("");
  const [spinner, setSpinner] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const sendOtp = async (e) => {
    e.preventDefault();

    // validation
    if (email === "") {
      return toast.error("Enter Your Email !");
    } else if (!email.includes("@")) {
      return toast.error("Enter Valid Email !");
    } else {
      // valid email
      setSpinner(true);
      const data = {
        email: email,
      };
      dispatch(sentOtp(data, navigate, toast, setSpinner));
    }
  };

  return (
    <>
      <section className="auth">
        <div className="form_data">
          <div className="form_heading">
            <h1>Welcome Back, Log In</h1>
            <p>Hi, we are glad you are back. Please login.</p>
          </div>
          <form>
            <div className="form_input">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                name="email"
                value={email}
                id=""
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter Your Email Address"
              />
            </div>
            <button className="btn" onClick={sendOtp}>
              Login
              {spinner ? (
                <span>
                  <Spinner animation="border" />
                </span>
              ) : (
                ""
              )}
            </button>
            <p>
              Don't have an account <NavLink to="/register">Sign up</NavLink>{" "}
            </p>
          </form>
          <ToastContainer />
        </div>
      </section>
    </>
  );
};

export default Login;
