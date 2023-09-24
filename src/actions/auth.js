// modify the data
import * as api from "../api";
import { setCurrentUser } from "./currentUser";

export const register =
  (authData, navigate, setInputdata, toast) => async (dispatch) => {
    try {
      const response = await api.register(authData);

      const { data } = response;
      // console.log("Respone value", response);
      // console.log("Register api data", response.data);

      dispatch({ type: "AUTH", data });
      dispatch(setCurrentUser(JSON.parse(localStorage.getItem("Profile"))));
      setInputdata({ fname: "", email: "", password: "" });
      toast("User Successfully Regitered!");
      setTimeout(() => {
        navigate("/");
      }, 1000);
    } catch (error) {
      toast("Already Registered!");
      console.log(error);
    }
  };

// sending the email here
export const sentOtp =
  (emailData, navigate, toast, setSpinner) => async (dispatch) => {
    try {
      // console.log("Email DATA", emailData);
      const response = await api.sentOtp(emailData);
      if (response.status === 200) {
        setSpinner(false);
        toast("OTP sent successfully!");
        navigate("/user/otp", { state: emailData.email });
      }
    } catch (error) {
      setSpinner(false);
      toast.error("Email not registered!");
      setTimeout(() => {
        return navigate("/register");
      }, 5000);
      console.log(error);
    }
  };

// sending the email and otp both
export const userVerify = (otpData, navigate, toast) => async (dispatch) => {
  try {
    const { data } = await api.userVerify(otpData);

    dispatch({ type: "AUTH", data }); // this line will sent the data and store it to localstorage
    dispatch(setCurrentUser(JSON.parse(localStorage.getItem("Profile"))));
    toast("Logged In Successfully!");
    setTimeout(() => {
      navigate("/");
    }, 2000);
    // navigate("/chatbot");
  } catch (error) {
    toast("Invalid OTP");
    console.log(error);
  }
};
