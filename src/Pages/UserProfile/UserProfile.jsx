import React, { useState, useEffect } from "react";
import Avatar from "../../components/Avatar/Avatar";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBirthdayCake, faPen,faStar } from "@fortawesome/free-solid-svg-icons";
import moment from "moment";
import EditProfileForm from "./EditProfileForm";
import ProfileBio from "./ProfileBio";
import "./UserProfile.css";
import decode from "jwt-decode";
import { setCurrentUser } from "../../actions/currentUser";
import Header from "../../components/Header/Header";

const UserProfile = () => {
  const users = useSelector((state) => state.usersReducer);
  /////////////////For protected Routes////////////////
  const dispatch = useDispatch();
  let User;
  useEffect(() => {
    setTimeout(() => {
      User = useSelector((state) => state.currentUserReducer);
    }, 350);
  }, []);
  User = useSelector((state) => state.currentUserReducer);
  const navigate = useNavigate();
  useEffect(() => {
    const token = User?.token;
    // console.log("User.token", User?.token);
    if (token) {
      const decodedToken = decode(token);
      // logging out after 1hr
      // console.log(decodedToken.exp * 1000);
      if (decodedToken.exp * 1000 < new Date().getTime()) {
        dispatch({ type: "LOGOUT" });
        navigate("/login");
        dispatch(setCurrentUser(null));
      }
    }
    // On refreshing the profile is disappearing
    // so dispatch here on each refersh
    dispatch(setCurrentUser(JSON.parse(localStorage.getItem("Profile"))));
  }, [User?.token]);

  useEffect(() => {
    if (User === null) {
      navigate("/login");
    }
  }, [User]);
  //////////////////////////////////////////////////////////

  const { id } = useParams();
  // console.log("All Users", users);
  const currentProfile = users?.filter((user) => user._id === id)[0];
  let currentUser = User;

  const [Switch, setSwitch] = useState(false);

  return (
    <>
      <div
        style={{
          width: "100vw",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          padding: "5px",
        }}
      >
        <Header />
        <section style={{ maxWidth: "720px", marginTop: "20px" }}>
          <div
            style={{ margin: "64px auto" }}
            className="user-details-container"
          >
            <div className="user-details">
              <Avatar
                backgroundColor="purple"
                color="white"
                fontSize="50px "
                px="40px"
                py="30px"
              >
                {currentProfile?.fname?.charAt(0).toUpperCase()}
              </Avatar>
              <div className="user-name">
                <h1>{currentProfile?.fname}  <span title="badge/rank" style={{fontSize:"30px",color:"gray"}}><i> - {currentProfile?.badge}</i></span></h1>
                <p>
                  <FontAwesomeIcon icon={faBirthdayCake} /> Joined{" "}
                  {moment(currentProfile?.joinedOn).fromNow()}
                </p>
                <h2>
                  <FontAwesomeIcon icon={faStar} />
                  {" "}<i title="score">{currentProfile?.score}</i>
                </h2>
               
              </div>
            </div>
            {currentUser?.result?._id === id && (
              <button
                type="button"
                onClick={() => setSwitch(true)}
                className="edit-profile-btn"
              >
                <FontAwesomeIcon icon={faPen} /> Edit Profile
              </button>
            )}
          </div>
          {Switch ? (
            <EditProfileForm currentUser={currentUser} setSwitch={setSwitch} />
          ) : (
            <ProfileBio currentProfile={currentProfile} />
          )}
        </section>
      </div>
    </>
  );
};

export default UserProfile;
