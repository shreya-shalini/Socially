import React, { useState, useEffect, useContext } from "react";
import Post from "../post/Post";
import Share from "../share/Share";
import Stories from "../stories/Stories";
import "./feed.scss";
import { db } from "../../firebase";
import { collection, onSnapshot, query, where, getDoc, getDocs, doc } from "firebase/firestore";
import { AuthContext } from "../../context/AuthContext";

const Feed = () => {
  const { currentUser } = useContext(AuthContext);
  const [posts, setPosts] = useState([]);
  const [friendList, setFriendList] = useState([]);


  useEffect(() => {
    const fetchFriendList = async () => {
      try {
        // Fetch the user's friend list
        const userRef = doc(db, 'users', currentUser.uid);
        const userDoc = await getDoc(userRef);
        const friends = userDoc.data().friends || [];
  
        setFriendList(friends);
      } catch (error) {
        console.log('Error fetching friend list: ', error);
      }
    };
  
    const fetchPosts = async () => {
      try {
        // Fetch the posts of the user and their friends
        const postsRef = collection(db, 'posts');
        const q = query(postsRef, where('uid', 'in', [currentUser.uid, ...friendList]));
        const querySnapshot = await getDocs(q);
  
        setPosts(querySnapshot.docs.map((doc) => ({ id: doc.id, data: doc.data() })));
      } catch (error) {
        console.log('Error fetching posts: ', error);
      }
    };
  
    fetchFriendList();
    fetchPosts();
  }, [currentUser.uid, friendList]);
  


  return (
    <div className="feed">
      <div className="feedWrapper">
        <Stories />
        <Share />
        {posts
          .sort((a, b) => b.data.timestamp - a.data.timestamp)
          .map((p) => (
            <Post key={p.id} post={p} />
          ))}
      </div>
    </div>
  );
};

export default Feed;



