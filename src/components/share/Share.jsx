import React, { useContext, useState } from "react";
import "./share.scss";
import {
    Close,
    PermMedia,
    VideoCameraFront,
  } from "@mui/icons-material";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { db, storage } from "../../firebase";
import { v4 as uuid } from "uuid";
import { AuthContext } from "./../../context/AuthContext";
import {
  addDoc,
  arrayUnion,
  collection,
  serverTimestamp,
  Timestamp,
  updateDoc,
  doc,
} from "firebase/firestore";

  const Share = () => {
    const [error, setError] = useState(false);
  const { currentUser } = useContext(AuthContext);
  const [input, setInput] = useState("");

  const [img, setImg] = useState(null);

  const handlePost = async () => {
    if (img) {
      const storageRef = ref(storage, "Posts/" + uuid());
  
      const uploadTask = uploadBytesResumable(storageRef, img);
  
      try {
        await uploadTask;
  
        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
  
        await addDoc(collection(db, "posts"), {
          uid: currentUser.uid,
          photoURL: currentUser.photoURL,
          displayName: currentUser.displayName,
          input,
          img: downloadURL,
          timestamp: serverTimestamp(),
        });
  
        await updateDoc(doc(db, "usersPosts", currentUser.uid), {
          messages: arrayUnion({
            id: uuid(),
            uid: currentUser.uid,
            photoURL: currentUser.photoURL,
            displayName: currentUser.displayName,
            input,
            img: downloadURL,
            timestamp: Timestamp.now(),
          }),
        });
      } catch (error) {
        setError(true);
      }
    } else {
      await addDoc(collection(db, "posts"), {
        uid: currentUser.uid,
        photoURL: currentUser.photoURL,
        displayName: currentUser.displayName,
        input,
        timestamp: serverTimestamp(),
      });
  
      await updateDoc(doc(db, "usersPosts", currentUser.uid), {
        messages: arrayUnion({
          id: uuid(),
          uid: currentUser.uid,
          photoURL: currentUser.photoURL,
          displayName: currentUser.displayName,
          input,
          timestamp: Timestamp.now(),
        }),
      });
    }
  
    setInput("");
    setImg(null);
  };
  
    
    const removeImage = () => {
      setImg(null);
    };
  
  
  return (
    <div className="share">
      <div className="shareWrapper">
        <div className="shareTop">
          <img
            src={currentUser.photoURL}
            alt=""
            className="shareProfileImg"
          />
          <textarea
            type="text"
            rows={2}
            style={{ resize: "none", overflow: "hidden" }}
            placeholder={"What's on your mind " + currentUser.displayName + "?"}
            value={input}
            className="shareInput"
            onChange={(e) => setInput(e.target.value)}
           
          />
        </div>
        <hr className="shareHr" />
        {img && (
          <div className="shareImgContainer">
            <img src={URL.createObjectURL(img)} alt="" className="shareImg" />
            <Close className="shareCancelImg" onClick={removeImage} />
          </div>
        )}
        <div className="shareBottom">
          <div className="shareOptions">
            <div className="shareOption">
              <VideoCameraFront
                className="shareIcon"
                style={{ color: "#bb0000f2" }}
              />
              <span className="shareOptionText">Live Video</span>
            </div>
            <label htmlFor="file" className="shareOption">
              <PermMedia className="shareIcon" style={{ color: "#2e0196f1" }} />
              <span className="shareOptionText">Photo/Video</span>
              <input
                type="file"
                id="file"
                accept=".png,.jpeg,.jpg"
                style={{ display: "none" }}
                onChange={(e) => setImg(e.target.files[0])}
              />
            </label>
            <div
              onClick={() => handlePost()} className="shareOption "
            ><span className="editButtonPost"> Post </span></div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Share