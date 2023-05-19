import React,{useContext} from "react";
import { Link } from "react-router-dom";
import "./profileRightBar.scss";
import { AuthContext } from "./../../context/AuthContext";

const ProfileRightBar = () => {
  const { currentUser } = useContext(AuthContext);
  return (
    <div className="profileRightBar">
      <div className="profileRightBarHeading">
        <span className="profileRightBarTitle"> User Information</span>
        <Link to="/profile/userId" style={{ textDecoration: "none" }}>
          <span className="editButton">Edit Profile</span>
        </Link>
      </div>

      <div className="profileRightBarInfo">
        <div className="profileRightBarInfoItem">
          <span className="profileRightBarInfoKey">Email: </span>
          <span className="profileRightBarInfoValue">{currentUser.email}</span>
        </div>
        <div className="profileRightBarInfoItem">
          <span className="profileRightBarInfoKey">Phone Number: </span>
          <span className="profileRightBarInfoValue">+91 8345600000</span>
        </div>
        <div className="profileRightBarInfoItem">
          <span className="profileRightBarInfoKey">Address: </span>
          <span className="profileRightBarInfoValue">
            Bengaluru, Karnataka
          </span>
        </div>
        <div className="profileRightBarInfoItem">
          <span className="profileRightBarInfoKey">Country: </span>
          <span className="profileRightBarInfoValue">India</span>
        </div>
        <div className="profileRightBarInfoItem">
          <span className="profileRightBarInfoKey">Relationship: </span>
          <span className="profileRightBarInfoValue">Single</span>
        </div>
      </div>

     
    </div>
  );
};

export default ProfileRightBar;
