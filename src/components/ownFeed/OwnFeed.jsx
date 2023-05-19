import React, {useState, useEffect,useContext} from 'react'
import './ownfeed.scss'
import Share from '../share/Share'
import Post from '../post/Post';
import ProfileRightBar from '../profileRightBar/ProfileRightBar';
import { db } from "../../firebase";
import { collection, onSnapshot } from "firebase/firestore";
import { AuthContext } from "./../../context/AuthContext";

const OwnFeed = () => {
  const { currentUser } = useContext(AuthContext);
  const [posts, setPosts] = useState([]);
  
  useEffect(() => {
    const unSub = onSnapshot(collection(db, "posts"), (snapshot) => {
      const filteredPosts = snapshot.docs
        .map((doc) => ({ id: doc.id, data: doc.data() }))
        .filter((post) => post.data.displayName === currentUser.displayName);

      setPosts(filteredPosts);
    });

    return () => {
      unSub();
    };
  }, [currentUser.displayName]);
  
  return (
    <div className="ownfeed">
    <div className="ownfeedWrapper">
    <ProfileRightBar />
      <Share />
      {posts
          .sort((a, b) => b.data.timestamp - a.data.timestamp)
          .map((p) => (
            <Post key={p.id} post={p} />
          ))}
    </div> 
  </div>
  )
}

export default OwnFeed