import React from "react";
import { useState, useEffect, useContext } from "react";
import { PiWarningCircle } from "react-icons/pi";
import { AuthContext } from "../../../Contexts/AuthState";
import './SmallScreenAlert.css'

export const SmallScreenAlert = () => {
  const { loggedUser } = useContext(AuthContext);
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 767);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 767);
    };

    // Add event listener for window resize
    window.addEventListener("resize", handleResize);

    // Remove event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="success_container">
      <header className="header">
        <div
          onClick={() => {
            navigate("/");
          }}
          className="logo"
        >
          <img src="/image 5.png" alt="" />
        </div>
        <div className="profile">
          {loggedUser?.name} <img src={loggedUser?.profile} alt="" />
        </div>
      </header>
      {isSmallScreen && (
        <div
          className="smallScreenAlert"
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            height: "90vh",
          }}
        >
          <div>
            <PiWarningCircle size={24} />
          </div>
          <h2>
            Profile editing not supported on mobile yet. Please switch to
            desktop!
          </h2>
        </div>
      )}
    </div>
  );
};
