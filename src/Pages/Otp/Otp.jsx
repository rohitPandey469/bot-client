import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { userVerify } from "../../actions/auth";
import { useDispatch } from "react-redux";

const Otp = () => {
  const [otp, setOtp] = useState("");

  const location = useLocation(); //the state from login page is being catched through useLocation hook

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const LoginUser = async (e) => {
    e.preventDefault();

    if (otp === "") {
      return toast.error("Enter Your Otp");
    } else if (!/[^a-zA-Z]/.test(otp)) {
      return toast.error("Enter Valid Otp");
    } else if (otp.length < 6) {
      return toast.error("Otp Length minimum 6 digit");
    } else {
      const data = {
        otp,
        email: location.state,
      };

      dispatch(userVerify(data, navigate,toast));
      //   if (response.status === 200) {
      //     localStorage.setItem("userToken", response.data.userToken);
      //     toast.success(response.data.message);
      //     setTimeout(() => {
      //       navigate("/dashboard");
      //     }, 5000);
      //   } else {
      //     toast.error(response.response.data.error);
      //   }
    }
  };
  return (
    <>
      <section className="auth">
        <div className="form_data">
          <div className="form_heading">
            <h1>Please enter your otp here</h1>
          </div>
          <form onSubmit={LoginUser}>
            <div className="form_input">
              <label htmlFor="fname">OTP</label>
              <input
                type="text"
                name="otp"
                id=""
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="Otp"
              />
            </div>
            <button className="btn">Submit</button>
          </form>
          <ToastContainer />
        </div>
      </section>
    </>
  );
};

export default Otp;
