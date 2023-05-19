import React, { useContext, useEffect, useState } from 'react'
import './ownpost.scss'
import { Users } from "./../../data";
import { IconButton } from "@mui/material";
import {
  ChatBubbleOutline,
  MoreVert,
  Favorite,
  ThumbUp,
  ThumbUpAltOutlined,
  ShareOutlined,
} from "@mui/icons-material";
import { Link } from "react-router-dom";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import { db } from "../../firebase";
import { AuthContext } from "../../context/AuthContext";
import { Posts } from "../../data";

const OwnPost = ({ownpost}) => {
  return (
    <div className="post">
      <div className="postWrapper">
        <div className="postTop">
          <div className="postTopLeft">
            {/* <Link to="/profile/userId"> */}
            <img src="/assets/person/user.jpg" alt="" className="postProfileImg" />
              {/* <img
                src={
                  Users.filter((u) => u.id === post.userId)[0].profilePicture
                }
                alt=""
                className="postProfileImg"
              /> */}
            {/* </Link> */}
            <span className="postUsername"> Amber
              {/* {Users.filter((u) => u.id === post.userId)[0].username} */}
            </span>
            <span className="postDate">{ownpost.date}</span>
          </div>
          <div className="postTopRight">
            <IconButton>
              <MoreVert className="postVertButton" />
            </IconButton>
          </div>
        </div>
        <div className="postCenter">
          <span className="postText">{ownpost.body}</span>
          <img src={ownpost.photo} alt="" className="postImg" />
        </div>
        <div className="postBottom">
          <div className="postBottomLeft">
            <Favorite className="bottomLeftIcon" style={{ color: "red" }} />
            <ThumbUp className="bottomLeftIcon" style={{ color: "#011631" }} />
            <span className="postLikeCounter">{ownpost.like}</span>
          </div>
          <div className="postBottomRight">
            <span className="postCommentText">
              {ownpost.comment} · comments · share
            </span>
          </div>
        </div>

      </div>
    </div>
  )
}

export default OwnPost