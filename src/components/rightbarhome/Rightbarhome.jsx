import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import Online from "../online/Online";
import "./rightbarhome.scss";
import { collection, getDocs, doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";

const Rightbarhome = () => {
  const { currentUser } = useContext(AuthContext);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "users"));
        const userList = querySnapshot.docs
          .filter((doc) => doc.id !== currentUser.uid) 
          .map((doc) => ({
            id: doc.id,
            data: doc.data(),
            isFollowing: false, 
          }));
        setUsers(userList);
      } catch (error) {
        console.log("Error fetching users: ", error);
      }
    };

    fetchUsers();
  }, [currentUser.uid]);

  useEffect(() => {
    const updateFollowStatus = async () => {
      try {
        if (users.length > 0) {
          const userRef = doc(db, "users", currentUser.uid);
          const userDoc = await getDoc(userRef);
          const friendList = userDoc.data().friends || [];
          const updatedUsers = users.map((user) => ({
            ...user,
            isFollowing: friendList.includes(user.id),
          }));
          setUsers(updatedUsers);
        }
      } catch (error) {
        console.log("Error updating follow status: ", error);
      }
    };

    updateFollowStatus();
  }, [users, currentUser.uid]);

  const followUser = async (userId) => {
    try {
      const userRef = doc(db, "users", currentUser.uid);
      const userDoc = await getDoc(userRef);
      const friendList = userDoc.data().friends || [];
      if (!friendList.includes(userId)) {
        const updatedFriendList = [...friendList, userId];
        await updateDoc(userRef, { friends: updatedFriendList });
      }
    } catch (error) {
      console.log("Error following user: ", error);
    }
  };

  const unfollowUser = async (userId) => {
    try {
      const userRef = doc(db, "users", currentUser.uid);
      const userDoc = await getDoc(userRef);
      const friendList = userDoc.data().friends || [];
      if (friendList.includes(userId)) {
        const updatedFriendList = friendList.filter((id) => id !== userId);
        await updateDoc(userRef, { friends: updatedFriendList });
      }
    } catch (error) {
      console.log("Error unfollowing user: ", error);
    }
  };

  return (
    <div className="rightbarhome">
      <img src="/assets/ads/adv.jpg" alt="" className="rightbarAdvert" />

      <span className="rightbarTitle">Follow/Unfollow People </span>

      <ul className="rightbarFriendList">
        {users.map((user) => (
          <Online
            key={user.id}
            onlineuser={user}
            onFollow={followUser}
            onUnfollow={unfollowUser}
          />
        ))}
      </ul>
    </div>
  );
};

export default Rightbarhome;



