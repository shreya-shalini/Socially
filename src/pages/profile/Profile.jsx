import React, {useContext} from 'react'
import './profile.scss'
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import OwnFeed from '../../components/ownFeed/OwnFeed';
import { AuthContext } from "./../../context/AuthContext";

const Profile = () => {
  const { currentUser } = useContext(AuthContext);
  return (
    <div className='profile'>
         <Navbar />
      <div className="profileWrapper">
        <Sidebar />
        <div className="profileRight">
          <div className="profileRightTop">
            <div className="profileCover">
              <img
                src="/assets/profileCover/profilecover.jpg"
                alt=""
                className="profileCoverImg"
              />
              <img
                src={currentUser.photoURL}
                alt=""
                className="profileUserImg"
              />
            </div>
            <div className="profileInfo">
              <h4 className="profileInfoName">{currentUser.displayName}</h4>
              <span className="profileInfoDesc">Hi Friends!</span>
            </div>
          </div>
          <div className="profileRightBottom">
             
            <OwnFeed />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile