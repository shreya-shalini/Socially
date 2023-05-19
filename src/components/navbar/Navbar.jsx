import React,{useContext, useEffect} from "react";
import "./navbar.scss";
import { Link } from "react-router-dom";
import PersonSearchIcon from '@mui/icons-material/PersonSearch';
import PersonIcon from "@mui/icons-material/Person";
import ChatIcon from '@mui/icons-material/Chat';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import { AuthContext } from "./../../context/AuthContext";

const Navbar = () => {
  const { currentUser } = useContext(AuthContext);
  useEffect(() => {
    const logo = document.querySelector(".logo");

    const spans = document.querySelectorAll(".logo span");
    spans.forEach((span, index) => {
      span.style.setProperty("--index", index);
    });

    const handleLogoHover = () => {
      spans.forEach((span) => {
        span.style.animation = "bounceAnimation 0.5s ease-in-out 2";
        span.style.animationDelay = `calc(0.1s * var(--index))`;
      });
    };

    const handleLogoHoverEnd = () => {
      spans.forEach((span) => {
        span.style.animation = "none";
      });
    };

    logo.addEventListener("mouseenter", handleLogoHover);
    logo.addEventListener("mouseleave", handleLogoHoverEnd);

    return () => {
      logo.removeEventListener("mouseenter", handleLogoHover);
      logo.removeEventListener("mouseleave", handleLogoHoverEnd);
    };
  }, []);
  return (
    <div className="navbarContainer">
      <div className="left">
        <Link to="/" style={{ textDecoration: "none"}}>
          <span className="logo">
          <span>S</span>
          <span>o</span>
          <span>c</span>
          <span>i</span>
          <span>a</span>
          <span>l</span>
          <span>l</span>
          <span>y</span>
          </span>
        </Link>
      </div>
      <div className="center">
        <div className="searchBar">
          <input
            type="text"
            placeholder="Search for friends"
            className="barInput"
          />
          
          <PersonSearchIcon className="searchIcon" />
        </div>
      </div>
      <div className="right">
        {/* <div className="navbarLinks">
          <span className="navbarLink">Homepage</span>
          <span className="navbarLink">Timeline</span>
        </div> */}
        <div className="navbarIcons">
          <div className="iconItem">
            <PersonIcon />
            <span className="iconBadge">2</span>
          </div>
          <div className="iconItem">
            <ChatIcon />
            <span className="iconBadge">10</span>
          </div>
          <div className="iconItem">
            <NotificationsActiveIcon />
            <span className="iconBadge">8</span>
          </div>
        </div>
        <Link to={`/profile/${currentUser.displayName}`}>
          <img src={currentUser.photoURL} alt="" className="userImage" />
        </Link>
      </div>
    </div>
  );
};

export default Navbar;