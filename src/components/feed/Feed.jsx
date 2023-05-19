import React, {useState, useEffect} from "react";
import Post from "../post/Post";
import Share from "../share/Share";
import Stories from "../stories/Stories";
import "./feed.scss";
import { db } from "../../firebase";
import { collection, onSnapshot } from "firebase/firestore";

const Feed = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const unSub = onSnapshot(collection(db, "posts"), (snapshot) => {
      setPosts(snapshot.docs.map((doc) => ({ id: doc.id, data: doc.data() })));
    });
    return () => {
      unSub();
    };
  }, []);
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

// import React, { useState, useEffect, useContext } from "react";
// import Post from "../post/Post";
// import Share from "../share/Share";
// import Stories from "../stories/Stories";
// import "./feed.scss";
// import { db } from "../../firebase";
// import { collection, onSnapshot, query, where } from "firebase/firestore";
// import { AuthContext } from "../../context/AuthContext";

// const Feed = () => {
//   const { currentUser } = useContext(AuthContext);
//   const [posts, setPosts] = useState([]);

//   useEffect(() => {
//     const unsubscribe = onSnapshot(
//       query(
//         collection(db, "posts"),
//         where("author", "in", [currentUser.uid, ...currentUser.friends])
//       ),
//       (snapshot) => {
//         setPosts(snapshot.docs.map((doc) => ({ id: doc.id, data: doc.data() })));
//       }
//     );

//     return () => {
//       unsubscribe();
//     };
//   }, [currentUser.uid, currentUser.friends]);

//   return (
//     <div className="feed">
//       <div className="feedWrapper">
//         <Stories />
//         <Share />
//         {posts
//           .sort((a, b) => b.data.timestamp - a.data.timestamp)
//           .map((p) => (
//             <Post key={p.id} post={p} />
//           ))}
//       </div>
//     </div>
//   );
// };

// export default Feed;





