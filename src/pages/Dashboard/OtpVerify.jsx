import React, { useContext, useEffect, useState } from "react";
import "./UserInfo/UserInfo.css";
import { AuthContext } from "../../Contexts/AuthState";
import { toast } from "react-toastify";
import { useCookies } from "react-cookie";
import { UserContext } from "../../Contexts/UserState";
import { useNavigate } from "react-router-dom";
import mixpanel from "mixpanel-browser";

const OtpVerify = () => {
  const params = new URLSearchParams(window.location.search);
  const navigate = useNavigate();
  const { loggedUser } = useContext(AuthContext);
  const [otp, setotp] = useState("");
  const [number, setNumber] = useState(null);
  const [cookies, setCookie] = useCookies();

  const { SaveUserInfo } = useContext(UserContext);

  useEffect(() => {
    if (loggedUser?.is_verified) {
      navigate("/dashboard");
    }
  }, [loggedUser]);
  
  useEffect(() => {
    if (params.get("number")) {
      setNumber(params.get("number"));
    }
    mixpanel.track("Page visited Anchors Collab");
  }, []);

  const verfiyOTP = async () => {
    mixpanel.track("Verify otp anchors collab")
    if (otp?.length !== 6) {
      toast.info("Enter a proper code", {
        position: "top-center",
        autoClose: 2000,
      });
    } else {
      let code = cookies?.ccoondfe;
      if (!code) {
        toast.error("OTP was valid for 2 minute, Please retry again", {
          position: "top-center",
          autoClose: 2000,
        });
      } else {
        if (parseInt(otp) === parseInt(parseInt(code) / 562002)) {
          // Save the number in user info ----------
          let result = await SaveUserInfo({
            is_verified: true,
          });

          if (result) {
            toast.success("Verification was successfull", {
              position: "top-center",
              autoClose: 2000,
            });

            window.open("/dashboard", "_self");
          } else {
            toast.error("Some error occured in verification", {
              position: "top-center",
              autoClose: 2000,
            });
          }
        } else {
          toast.error("Invalid OTP!!!. Try again!!!", {
            position: "top-center",
            autoClose: 2000,
          });
        }
      }
    }
  };

  return (
    <div className="info_container">
      <header className="header">
        <div
          onClick={() => {
            navigate("/");
          }}
          className="logo"
        >
          <img src="/image 5.png" alt="" />
        </div>
      </header>
      <div className="content">
        <img src="/celebrate.svg" alt="" />
        <div className="text">
          <h1>Welcome, {loggedUser?.name?.split(" ")[0]}</h1>
          <p>Please fill this to secure your spot</p>
        </div>
        <p
          style={{
            fontFamily: "Public sans",
            textAlign: "center",
            fontWeight: "400",
            color: "#757575",
          }}
        >
          OTP sent to this number <b>{`+${number}`}</b> <img src="edit.svg" alt="" />{" "}
          <br /> Please enter OTP to continue
        </p>
        <form className="userform" action="">
          <div className="input_field">
            <img src="/otp.svg" alt="" />
            <input
              type="text"
              value={otp}
              onChange={(e) => setotp(e.target.value)}
              placeholder="OTP"
            />
          </div>
        </form>
      </div>
      <footer className="footer" onClick={verfiyOTP}>
        <button>Continue →</button>
      </footer>
    </div>
  );
};
export default OtpVerify;
