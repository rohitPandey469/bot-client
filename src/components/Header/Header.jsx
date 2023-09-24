import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";
import search from "../../assets/search-solid.svg";
import Avatar from "../../components/Avatar/Avatar";
import "./Header.css";
import { useSelector, useDispatch } from "react-redux";
import { setCurrentUser } from "../../actions/currentUser";
import decode from "jwt-decode";

const Header = () => {
  const dispatch = useDispatch();
  var User = useSelector((state) => state.currentUserReducer);

  useEffect(() => {
    const token = User?.token;
    if (token) {
      const decodedToken = decode(token);
      // logging out after 1hr
      if (decodedToken.exp * 1000 < new Date().getTime()) {
        handleLogout();
      }
    }
    // On refreshing the profile is disappearing
    // so dispatch here on each refersh
    dispatch(setCurrentUser(JSON.parse(localStorage.getItem("Profile"))));
  }, []);

  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
    navigate("/");
    dispatch(setCurrentUser(null));
  };

  return (
    <nav className="main-nav">
      <div className="navbar">
        <div className="navbar-1">
          <Link
            style={{
              border: "none",
              backgroundColor: "gray",
              color: "White",
              borderRadius: "5px",
              padding: "10px",
              fontSize: "20px",
            }}
            to="/chatbot"
            className="nav-item nav-logo"
            title="chatbot"
          >
            Interact with AI
          </Link>
          <Link
            to="/Questions"
            style={{ width: "95px", padding: "10px 20px",border:"none" }}
            className="nav-item nav-btn res-nav"
            title="All questions"
          >
            Questions
          </Link>
          <Link
            to="/checkout"
            style={{ width: "70px", padding: "10px 20px",border:"none",textAlign:"center" }}
            className="nav-item nav-btn res-nav"
            title="Payment gateway"
          >
            Stripe 
          </Link>
          <Link
            to="/AskQuestion"
            style={{ width: "60px", padding: "10px 20px",border:"none",textAlign:"center" }}
            className="nav-item nav-btn res-nav"
            title="Ask your own question"
          >
            Ask 
          </Link>
          <Link
            to="/info"
            style={{ width: "60px", padding: "10px 20px",border:"none",textAlign:"center" }}
            className="nav-item nav-btn res-nav"
            title="workings of the website"
          >
            Info
          </Link>
          <form>
            <input type="text" placeholder="Dummy Search..." />
            <img src={search} alt="search" width="18" className="search-icon" />
          </form>
        </div>
        <div className="navbar-2">
          {User === null ? (
            <Link 
           title="login" to="/login" className="nav-item nav-links">
              Log in
            </Link>
          ) : (
            <>
              <Avatar
                backgroundColor="#009dff"
                px="10px"
                py="7px"
                borderRadius="50%"
                color="white"
                title="User Profile"
              >
                <Link
                  to={`/Users/${User?.result?._id}`}
                  style={{ color: "white", textDecoration: "none" }}
                >
                  {User?.result?.fname.charAt(0).toUpperCase()}
                </Link>
              </Avatar>
              <button className="nav-item nav-links" onClick={handleLogout}>
                Log out
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Header;
