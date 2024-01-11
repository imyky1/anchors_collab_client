import React, { useContext, useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./UserInfo.css";
import { AuthContext } from "../../../Contexts/AuthState";
import { UserContext } from "../../../Contexts/UserState";
import { useCookies } from "react-cookie";
import { toast } from "react-toastify";
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'
import mixpanel from "mixpanel-browser";

const UserInfo = () => {
  const navigate = useNavigate();
  const [cookies, setCookie] = useCookies();

  const { loggedUser } = useContext(AuthContext);
  const referCode = localStorage.getItem("anchors_collab_refer")
  const { SaveUserInfo,SentMessageFromSNS } = useContext(UserContext);
  const [value, setValue] = useState()
  const [data, setdata] = useState({
    linkedinLink: null,
    mobile: value,
    refered_code: referCode,
  });
  const [error, setError] = useState("");

  useEffect(() => {
    mixpanel.track("Page visited Anchors Collab")
  }, [])
  
  
  useEffect(() => {
    if(loggedUser?.is_verified){
      navigate("/dashboard")
    }

  }, [loggedUser])

  const handleChnage = (e) => {
    setdata({ ...data, [e.target.name]: e.target.value });
  };

  const saveDetails = async () => {
    mixpanel.track("Save Details anchors collab")
    try {
      data.mobile = value
      if (!data?.linkedinLink || !data?.mobile) {
        setError("Please fill in both LinkedIn profile and Mobile number.");
        return;
      }
      let result = await SaveUserInfo(data);
      if(result.success){
        navigate(`/dashboard/otp-verify?number=${data?.mobile}`);
        sendOTP()
      }     
      else{
        // console.log(result)
        setError(result.error)
      }

    } catch (e) {
      console.log(e)
    }
  };

  const sendOTP = async () => {
    if (data?.mobile > 4) {
      let json = await SentMessageFromSNS(data?.mobile)

      if (json?.MessageID) {
        toast.success("OTP sent successfully", {
          autoClose: 1500,
        });

        let otpcode = parseInt(json?.code - 145626) * 562002;
        setCookie("ccoondfe", otpcode, { maxAge: 120 }); // valid for one minute
      }
    } else {
      toast.error("Enter a proper mobile number", {
        autoClose: 2000,
      });
    }
  };
  
  return (
    <div className="info_container">
      <header className="header">
        <div  className="logo">
          <img onClick={()=>{navigate('/')}} src="/image 5.png" alt="" />
        </div>
      </header>
      <div className="content">
        <img src="/celebrate.svg" alt="" />
        <div className="text">
          <h1>Welcome, {loggedUser?.name?.split(" ")[0]}</h1>
          <p>Please fill this to secure your spot</p>
        </div>
        <form className="userform" action="">
          <div className="input_field">
            <img src="/linkedinSmall.svg" alt="" />
            <input
              type="text"
              name="linkedinLink"
              value={data?.linkedinLink}
              onChange={handleChnage}
              placeholder="Enter your linkedIn profile"
            />
          </div>
          <div className="input_field">
            {/* <img src="/call.svg" alt="" /> */}
            <PhoneInput
              style={{width:'100%',marginLeft:'10px'}}
              name="mobile"
              value={value}
      onChange={setValue}
              placeholder="9876543210"
            />
          </div>
          <div className="input_field">
            <img src="/referal.svg" alt="" />
            <input
              type="text"
              name="refered_code"
              value={data?.refered_code}
              onChange={handleChnage}
              placeholder="Enter your referral code"
            />
          </div>
        </form>
        {error && (
          <div className="toast">
            <p onClick={() => setError("")}>{error}</p>
          </div>
        )}
      </div>
      <footer className="footer">
        <button onClick={saveDetails}>Continue →</button>
      </footer>
    </div>
  );
};
export default UserInfo;
