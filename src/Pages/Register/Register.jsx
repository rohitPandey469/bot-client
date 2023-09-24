import React from "react";
import "../../styles/mix.css";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import Spinner from "react-bootstrap/Spinner";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../../actions/auth";

const Register = () => {
  const [spinner, setSpinner] = useState(false);
  const [passhow, setPassShow] = useState(false);
  const [inputdata, setInputdata] = useState({
    fname: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  // input values handle
  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputdata({ ...inputdata, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { fname, email, password } = inputdata; //get the values

    if (fname === "") {
      return toast.error("Enter Your Name");
    } else if (email === "") {
      return toast.error("Enter Your Email");
    } else if (!email.includes("@")) {
      return toast.error("Enter Valid Email");
    } else if (password === "") {
      return toast.error("Enter Your Password");
    } else if (password.length < 6) {
      return toast.error("password length minimum 6 character");
    } else {
      dispatch(register(inputdata, navigate,setInputdata,toast));

      //   if (response.status === 200) {
      //     console.log("backend value", response.data);
      //     // an OK status
      //     setInputdata({ ...inputdata, fname: "", email: "", password: "" });
      //     navigate("/");
      //   } else {
      //     return toast.error(response.response.data.error);
      //   }
    }
  };

  return (
    <>
      <section className="auth">
        <div className="form_data">
          <div className="form_heading">
            <h1>Sign Up</h1>
            <p>Hi, we are glad you are back. Please register.</p>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="form_input">
              <label htmlFor="fname">Name</label>
              <input
                type="text"
                name="fname"
                id=""
                onChange={handleChange}
                placeholder="Enter Your Name"
              />
            </div>
            <div className="form_input">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                name="email"
                id=""
                onChange={handleChange}
                placeholder="Enter Your Email Address"
              />
            </div>
            <div className="form_input">
              <label htmlFor="password">Password</label>
              <div className="two">
                <input
                  type={!passhow ? "password" : "text"}
                  name="password"
                  id=""
                  onChange={handleChange}
                  placeholder="Enter Your password"
                />
                <div className="showpass" onClick={() => setPassShow(!passhow)}>
                  {!passhow ? "Show" : "Hide"}
                </div>
              </div>
            </div>
            <button className="btn">
              Sign Up
              {spinner ? (
                <span>
                  <Spinner animation="border" />
                </span>
              ) : (
                ""
              )}
            </button>
            <p>
              Already have an account <NavLink to="/login">Log in</NavLink>{" "}
            </p>
          </form>
          <ToastContainer />
        </div>
      </section>
    </>
  );
};

export default Register;
