import React from "react";
import Rightbarhome from "../rightbarhome/Rightbarhome";
import "./rightbar.scss";
import ProfileRightBar from "./../profileRightBar/ProfileRightBar";

const Rightbar = () => {
  return (
    <div className="rightbar">
      <div className="rightbarWrapper">
         <Rightbarhome />
      </div>
    </div>
  );
};

export default Rightbar;
