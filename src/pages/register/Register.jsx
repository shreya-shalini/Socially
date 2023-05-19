import React, {useState, useEffect} from "react";
import "./register.scss";
import { DriveFolderUploadOutlined } from "@mui/icons-material";
import { Link, useNavigate  } from "react-router-dom";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { auth, db, storage } from "../../firebase";

const Register = () => {
  const [img, setImg] = useState(null);
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const logo = document.querySelector(".registerLogo");

    const spans = document.querySelectorAll(".registerLogo span");
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

  const handleRegister = async (e) => {
    e.preventDefault();
    const displayName = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
  
      const storageRef = ref(storage, "usersImages/" + displayName);
  
      const uploadTask = uploadBytesResumable(storageRef, img);
  
      uploadTask.on(
        (error) => {
          setError(true);
        },
        async () => {
          try {
            await uploadTask;
            
            if (uploadTask.snapshot.state === "success") {
              getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
                await updateProfile(res.user, {
                  displayName,
                  photoURL: downloadURL,
                });
  
                await setDoc(doc(db, "users", res.user.uid), {
                  uid: res.user.uid,
                  displayName,
                  email,
                  photoURL: downloadURL,
                });
  
                await setDoc(doc(db, "usersPosts", res.user.uid), { messages: [] });
                
              });
            } else {
              setError(true);
            }
          } catch (error) {
            setError(true);
          }
        }
      );
    } catch (error) {
      setError(true);
    }
    
    navigate("/");
  };
  
  
  return (
    <div className="register">
      <div className="registerWrapper">
      <div className="LeftRegister">
          <div className="registerBox">
            <div className="top">
              <img
                src={
                  img
                    ? URL.createObjectURL(img)
                    : "/assets/profileCover/DefaultProfile.jpg"
                }
                alt=""
                className="profileImg"
              />
              <div className="formInput">
              <label htmlFor="file">
                  Image: <DriveFolderUploadOutlined className="icon" />
                  <input
                    type="file"
                    name="file"
                    id="file"
                    accept=".png,.jpeg,.jpg"
                    style={{ display: "none" }}
                    onChange={(e) => setImg(e.target.files[0])}
                  />
                </label>
              </div>
            </div>
            <div className="bottom">
            <form onSubmit={handleRegister} className="bottomBox">
                <input
                  type="text"
                  placeholder="Username"
                  id="username"
                  className="registerInput"
                  required
                />
                <input
                  type="email"
                  placeholder="Email"
                  id="email"
                  className="registerInput"
                  required
                />
                <input
                  type="password"
                  placeholder="Password"
                  id="password"
                  className="registerInput"
                  minLength={6}
                  required
                />
                
                <button type="submit" className="registerButton">
                  Create Account
                </button>
                <Link to="/">
                  <button className="loginRegisterButton">
                    Log into Account
                  </button>
                </Link>
                {error && <span>Something went wrong</span>}
              </form>
            </div>
          </div>
        </div>
        <div className="RightRegister">
          <h3 className="registerLogo">
          <span>S</span>
          <span>o</span>
          <span>c</span>
          <span>i</span>
          <span>a</span>
          <span>l</span>
          <span>l</span>
          <span>y</span>
          </h3>
          <span className="registerDesc">
            Get Social with Socially!!
          </span>
        </div>
        
      </div>
    </div>
  );
};

export default Register;
