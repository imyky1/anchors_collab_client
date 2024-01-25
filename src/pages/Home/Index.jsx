import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import "./Home.css";
import { AuthContext } from "../../Contexts/AuthState";
import { useNavigate } from "react-router-dom";
import LoaderOne from "../../Components/Loaders/Loader";
import mixpanel from "mixpanel-browser";
import { FaLinkedinIn } from "react-icons/fa6";
import { RiShining2Line } from "react-icons/ri";
import { MdCelebration } from "react-icons/md";
import imagesStock from "../../assets/Images/imagesStock.png";

const Home = () => {
  const navigate = useNavigate();
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 798);
  const { loggedUser } = useContext(AuthContext);

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    mixpanel.track("Page Visit Anchors Collab");

    const handleURLParams = () => {
      const params = new URLSearchParams(window.location.search);
      const referParam = params.get("refer");
      if (referParam) {
        localStorage.setItem("anchors_collab_refer", referParam);
      }
    };
    handleURLParams();
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 798);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleLinkedInLogin = async () => {
    if (loggedUser) {
      mixpanel.track("My account clicked on Anchors Collab");
      navigate(`/dashboard`);
    } else {
      mixpanel.track("Linkedin Login Main page Anchors Collab");
      setIsLoading(true);
      try {
        const host = import.meta.env.VITE_SERVER_HOST;
        const response = await axios.get(`${host}/auth/linkedin`);
        setIsLoading(false);
        // Check if the response contains the LinkedIn authorization URL
        if (response && response.data && response.data.redirectURL) {
          // Redirect to the URL received from your backend
          window.location.href = response.data.redirectURL;
        } else {
          console.error("Invalid response received from the server");
          // Handle error - redirect to a different page or display an error message
        }
      } catch (error) {
        console.error("Error during LinkedIn login:", error);
        // Handle error
      }
    }
  };

  return (
    <>
      {isLoading && <LoaderOne />}

      <div className="container">
        <header className="header">
          <div className="logo">
            <img
              onClick={() => {
                navigate("/");
              }}
              src="/image 5.png"
              alt=""
            />
          </div>
          <button
            className="button_type_01"
            style={{ display: "flex", gap: "5px" }}
            onClick={() => {
              handleLinkedInLogin();
            }}
          >
            {loggedUser ? (
              "My Account →"
            ) : isSmallScreen ? (
              <>
                <img src="/linkedin.svg" alt="" />
                Continue→
              </>
            ) : (
              "Continue with LinkedIn →"
            )}
          </button>
        </header>
        <div className="backgroundImage"></div>
        <div className="content">
          <span
            style={{
              borderRadius: "1000px",
              color: "#5E6EC4",
              borderColor: "#5E6EC4",
              cursor: "default",
            }}
            className="button_type_01"
          >
            <RiShining2Line /> For LinkedIn Creators Only
          </span>
          {/* <span                                                                                                                                                                                                                                                                                                                                                                                                                                                             
          style={{
            display: "flex",
            gap: "10px",
            borderRadius: "1000px",
            color:"#059669",
            borderColor:"#059669",
            marginTop:"16px",
            cursor:"default"
          }}
          className="button_type_01"
        >
           <MdCelebration /> Early Access : January 26
        </span> */}
          <div className="text">
            <h1>
              Get Noticed! <br /> Let Brands Find YOU
            </h1>
            <p>
              Connect & Collaborate with the perfect brands. Elevate your
              LinkedIn influence.
            </p>
          </div>
        </div>
        <footer className="footer">
          <img src="/airplane.svg" alt="" />
          <p>Join the waitlist</p>
          <button
            onClick={() => {
              handleLinkedInLogin();
            }}
            className="button_type_01"
          >
            {" "}
            {loggedUser ? (
              "My account →"
            ) : (
              <>
                <FaLinkedinIn />
                Continue with LinkedIn →
              </>
            )}
          </button>

          <div>
            <img src={imagesStock} alt="" />
            <span>
              <b>400+</b> LinkedIn Creators Already Joined
            </span>
          </div>
        </footer>
      </div>
    </>
  );
};

export default Home;
