import React from 'react'
import logo from "../../assets/Images/logo.png"
import "./Loader.css"

// For user side pages
function LoaderOne() {
  
    return (
      <div className="loader_wrapper_one">
        <img
          src={logo}
          alt="..Loading"
          className="loader_img"
        />
      </div>
    );
  }
  

export default LoaderOne