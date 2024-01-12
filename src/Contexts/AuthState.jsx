import { createContext, useState,useEffect } from "react";
import mixpanel from "mixpanel-browser";
export const AuthContext = createContext();
const host = import.meta.env.VITE_SERVER_HOST;

const AuthState = (props) => {
  const [loggedUser, setLoggedUser] = useState(null);

  const [reFetchUserData, setReFetchUserData] = useState(false)

  useEffect(() => {
    GetUserData()
   
  }, [reFetchUserData])
  

  // fetches the linkedin user data -------
  const linkedinLogin = (token) => {
    fetch(`${host}/auth/linkedin/success?token=${token}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Credentials": true,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((resJSON) => {
        LoginUser(resJSON?.picture, resJSON?.name, resJSON?.email);
      });
  };

  // logoin the user and saves the token in the session
  const LoginUser = async (profile, name, email) => {
    const response = await fetch(`${host}/user/loginUser`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Credentials": true,
      },
      body: JSON.stringify({
        profile,
        name,
        email,
      }),
    });

    const result = await response.json();

    if (result?.success) {
       //Identify and track the user in Mixpanel
       mixpanel.identify(email);

       // if mixpanel has already props set then it would not be updated
       mixpanel.people.set_once({
         $first_name: name.split(" ")[0],
         $last_name: name.split(" ")[1],
         $email: email,
         fromCollab: true,
       });

      localStorage.setItem("jwtToken", result?.token);
      window.open("/dashboard/","_self")
    } else {
      // alert the error -------------
    }
  };

  // fetches the user's data --------------
  const GetUserData = async () => {
    const response = await fetch(`${host}/user/getLoginUserData`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Credentials": true,
        jwtToken: localStorage.getItem("jwtToken"),
      },
    });

    const result = await response.json();

    if (result?.success) {
      setLoggedUser({...result?.data,firstTime:result?.firstTime});
    } else {
      // alert the error -------------

      if (result?.logout) {
        localStorage.removeItem("jwtToken");
        console.log("Logging Out");
      } else {
        //  some error has occured
      }
    }
  };

  return (
    <AuthContext.Provider value={{ loggedUser, linkedinLogin, GetUserData ,setReFetchUserData}}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;
