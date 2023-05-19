
import React, { useEffect, useState, useContext } from "react";
import { collection, doc, onSnapshot, getDocs } from "firebase/firestore";
import { db } from "../../firebase";
import { AuthContext } from "../../context/AuthContext";
import "./friends.scss";

const Friends = () => {
  const { currentUser } = useContext(AuthContext);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchFriends = async () => {
      try {
        const userRef = doc(db, "users", currentUser.uid);

        const unsubscribe = onSnapshot(userRef, (doc) => {
          const friendList = doc.data().friends || [];

          getDocs(collection(db, "users")).then((querySnapshot) => {
            const userList = querySnapshot.docs
              .filter((doc) => doc.id !== currentUser.uid)
              .map((doc) => ({
                id: doc.id,
                data: doc.data(),
              }));

            const filteredUsers = userList.filter((user) => friendList.includes(user.id));

            const sortedUsers = filteredUsers.sort((a, b) => {
              const aTimestamp = a.data.timestamp;
              const bTimestamp = b.data.timestamp;
              return bTimestamp - aTimestamp;
            });

            const topFriends = sortedUsers.slice(0, 5);

            setUsers(topFriends);
          });
        });

        return () => unsubscribe();
      } catch (error) {
        console.log("Error fetching users: ", error);
      }
    };

    fetchFriends();
  }, [currentUser.uid]);

  

  return (
    <div>
      {console.log(users)}
      {users.length > 0 ? (
        users.map((user) => (
          <li className="friendSidebar" key={user.id}>
            <img src={user.data.photoURL} alt="" className="friendSidebarImg" />
            <span className="friendSidebarName">{user.data.displayName}</span>
          </li>
        ))
      ) : (
        <p>No users to display</p>
      )}
    </div>
  );
};

export default Friends;

