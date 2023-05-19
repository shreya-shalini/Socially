import React, { useContext, useState, useEffect } from "react";
import ChatIcon from "@mui/icons-material/Chat";
import GroupsIcon from "@mui/icons-material/Groups";
import ExitToAppOutlinedIcon from "@mui/icons-material/ExitToAppOutlined";
import HomeIcon from '@mui/icons-material/Home';
import MovieIcon from '@mui/icons-material/Movie';
import SettingsIcon from '@mui/icons-material/Settings';
import PersonIcon from '@mui/icons-material/Person';
import "./sidebar.scss";
import MenuLink from "../menuLink/MenuLink";
import Friends from "../friends/Friends";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase";
import { Link, useNavigate} from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const Sidebar = () => {
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();

 

  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
      <span onClick={() => navigate("/home")}>
         <MenuLink Icon={<HomeIcon />} text="Feed" />
         </span>
        <MenuLink Icon={<ChatIcon />} text="Messages" />
        <MenuLink Icon={<MovieIcon />} text="Reels" />
        <MenuLink Icon={<GroupsIcon />} text="Friends" />
        <span onClick={() => navigate("/profile/userId")}>
        <MenuLink Icon={<PersonIcon />} text="My Profile" />
        </span>
        <MenuLink Icon={<SettingsIcon />} text="Setting" />
        <span onClick={() => signOut(auth)}>
          <MenuLink Icon={<ExitToAppOutlinedIcon />} text="Logout" />
        </span>
        

        <button className="sidebarButton">Show More</button>
        <hr className="sidebarHr" />
        
        <ul className="friendSidebarList">
          <h6 className="friendsTitle">Recently added Friends</h6>
          {currentUser ? (
            <Friends user={currentUser}  key={currentUser.uid}  />
          ) : (
            <p>No friends to display</p>
          )}
        </ul>
      </div>
     
    </div>
  );
};

export default Sidebar;


