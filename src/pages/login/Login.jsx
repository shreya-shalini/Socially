import React, { useState , useEffect} from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import "./login.scss";
import { auth } from "../../firebase";

const Login = () => {

  const [error, setError] = useState(false);
  const navigate = useNavigate();
  
  useEffect(() => {
    const logo = document.querySelector(".loginLogo");

    const spans = document.querySelectorAll(".loginLogo span");
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

  const handleLogin = async (e) => {
    e.preventDefault();

    const email = e.target[0].value;
    const password = e.target[1].value;

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/home");
    } catch (error) {
      setError(true);
    }
  };

  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo"> 
          <span>S</span>
          <span>o</span>
          <span>c</span>
          <span>i</span>
          <span>a</span>
          <span>l</span>
          <span>l</span>
          <span>y</span>
          </h3>
          <span className="loginDesc">
          Get Social with Socially!!
          </span>
        </div>
        <div className="loginRight">
          <div className="loginBox">
            <div className="bottom">
              <form onSubmit={handleLogin} className="bottomBox">
                <input
                  type="email"
                  placeholder="Email"
                  id="email"
                  className="loginInput"
                  required
                />
                <input
                  type="password"
                  placeholder="Password"
                  id="password"
                  className="loginInput"
                  minLength={6}
                  required
                />

                <button type="submit" className="loginButton">
                  Sign In
                </button>
                <Link to="/register">
                  <button className="loginRegisterButton">
                    Create a New Account
                  </button>
                </Link>
                {error && <span>Something went wrong</span>}
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
