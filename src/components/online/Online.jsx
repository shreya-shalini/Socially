import React from "react";
import "./online.scss";
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';

const Online = ({ onlineuser, onFollow, onUnfollow }) => {
  const handleFollow = () => {
    onFollow(onlineuser.id);
  };

  const handleUnfollow = () => {
    onUnfollow(onlineuser.id);
  };

  return (
    <div className="online">
      <li className="rightbarFriend">
        <div className="rightbarProfileImgContainer">
          <img
            src={onlineuser.data.photoURL}
            alt=""
            className="rightbarProfileImg"
          />
        </div>
      
        <span className="rightbarUsername">{onlineuser.data.displayName}</span>
        {onlineuser.isFollowing ? (
          <div className="addFriendRightbar" onClick={handleUnfollow}>
            <PersonRemoveIcon className="removeFriendIcon" />
            <p className="unfollowRightbar">Unfollow</p>
          </div>
        ) : (
          <div className="addFriendRightbar" onClick={handleFollow}>
            <PersonAddIcon className="addFriendIcon" />
            <p className="followRightbar">Follow</p>
          </div>
        )}
      </li>
    </div>
  );
};

export default Online;
