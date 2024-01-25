import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./UserInfo.css";
import { AuthContext } from "../../../Contexts/AuthState";
import { UserContext } from "../../../Contexts/UserState";
import { useCookies } from "react-cookie";
import { toast } from "react-toastify";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import mixpanel from "mixpanel-browser";
import LoaderOne from "../../../Components/Loaders/Loader";
import { MdCelebration } from "react-icons/md";

const UserInfo = () => {
  const navigate = useNavigate();
  const [cookies, setCookie] = useCookies();

  const [isLoading, setIsLoading] = useState(false);

  const { loggedUser, setReFetchUserData } = useContext(AuthContext);
  const referCode = localStorage.getItem("anchors_collab_refer");
  const { SaveUserInfo, SentMessageFromSNS } = useContext(UserContext);
  const [value, setValue] = useState(loggedUser?.mobile);
  const [data, setdata] = useState({
    linkedinLink: loggedUser?.linkedinLink,
    mobile: value,
    refered_code: referCode,
  });
  useEffect(() => {
    mixpanel.track("Page visited Anchors Collab");
  }, []);

  useEffect(() => {
    if (loggedUser?.is_verified) {
      navigate("/dashboard");
    }
  }, [loggedUser]);

  const handleChnage = (e) => {
    setdata({ ...data, [e.target.name]: e.target.value });
  };

  const saveDetails = async () => {
    setIsLoading(true);
    mixpanel.track("Save Details anchors collab");
    const linkedinProfileRegex =
    /^https:\/\/(www\.|in\.)?linkedin\.com\/in\/[a-zA-Z0-9_-]+\/?.*$/;

    try {
      data.mobile = value;

      if (!data?.linkedinLink || !data?.mobile) {
        setIsLoading(false);
        toast.error("Please fill in both LinkedIn profile and Mobile number.", {
          autoClose: 1500,
        });
        return;
      } else if (!linkedinProfileRegex.test(data?.linkedinLink)) {
        setIsLoading(false);
        toast.error("Enter your linkedin profile link", {
          autoClose: 1500,
        });
        return;
      } else if (value.length < 8) {
        setIsLoading(false);
        toast.error("Enter a proper mobile number", {
          autoClose: 1500,
        });
        return;
      }

      let result = await SaveUserInfo(data);
      if (result.success) {
        setReFetchUserData((prev) => {
          !prev;
        });
        setIsLoading(false);
        navigate(`/dashboard/otp-verify?number=${data?.mobile}`);
        sendOTP();
      } else {
        setIsLoading(false)
        toast.error(result?.error, {
          autoClose: 1500,
        });
      }
    } catch (e) {
      setIsLoading(true);
      console.log(e);
    }
  };

  const sendOTP = async () => {
    if (data?.mobile > 4) {
      let json = await SentMessageFromSNS(data?.mobile);

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
    <>
      {isLoading && <LoaderOne />}
      <div className="info_container">
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
        </header>
        <div className="content">
        <span                                                                                                                                                                                                                                                                                                                                                                                                                                                             
          style={{
            display: "flex",
            gap: "10px",
            borderRadius: "1000px",
            color:"#059669",
            borderColor:"#059669",
            marginBottom:"40px",
            cursor:"default"
          }}
          className="button_type_01"
        >
           <MdCelebration /> Early Access : January 26
        </span>

          <div className="text">
            <h1>Welcome, {loggedUser?.name?.split(" ")[0]}</h1>
            <p> Fill the Details to Unlock your Referral Code<br/>
Be a <b>Top Referrer</b>: Get Early & Free Access</p>
          </div>
          <form className="userform" action="">
            <div className="input_field">
              <img src="/linkedinSmall.svg" alt="" />
              <input
                type="text"
                name="linkedinLink"
                value={data?.linkedinLink}
                onChange={handleChnage}
                placeholder="https://www.linkedin.com/in/ravi-ahirwar/"
              />
            </div>
            <div className="input_field">
              {/* <img src="/call.svg" alt="" /> */}
              <PhoneInput
                style={{ width: "100%" }}
                name="mobile"
                value={value}
                onChange={setValue}
                placeholder="8799710137"
                defaultCountry="IN"
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
        </div>
        <footer className="footer">
          <button onClick={saveDetails}>Continue →</button>
        </footer>
      </div>
    </>
  );
};
export default UserInfo;
