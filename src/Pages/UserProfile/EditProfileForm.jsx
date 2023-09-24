import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { updateProfile } from "../../actions/users";

const EditProfileForm = ({ currentUser, setSwitch }) => {
  const [name, setName] = useState(currentUser?.result?.name);
  const [about, setAbout] = useState(currentUser?.result?.about);
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    //  {
    dispatch(updateProfile(currentUser?.result?._id, { fname: name, about }));
    // }
    setSwitch(false);
  };

  return (
    <div style={{display:"flex",flexDirection:"column"}}>
      <h1 className="edit-profile-title" style={{textAlign:"center"}}>Edit Your Profile</h1>
      <h2 className="edit-profile-title-2" style={{textAlign:"center"}}>Public information</h2>
      <form style={{width:"100%",display:"flex",flexDirection:"column"}} className="edit-profile-form" onSubmit={handleSubmit}>
        <label htmlFor="name">
          <h3>Display name</h3>
          <input
            type="text"
            value={name}
            style={{
              width:"100%"
            }}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <label htmlFor="about">
          <h3>About me</h3>
          <textarea
            id="about"
            cols="30"
            rows="10"
            style={{
              width:"100%"
            }}
            value={about}
            onChange={(e) => setAbout(e.target.value)}
          ></textarea>
        </label>
        <br />
        <input type="submit" value="Save profile" className="user-submit-btn" />
        <button
          type="button"
          className="user-cancel-btn"
          onClick={() => setSwitch(false)}
        >
          Cancel
        </button>
      </form>
    </div>
  );
};

export default EditProfileForm;
