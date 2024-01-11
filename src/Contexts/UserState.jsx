import { createContext } from "react";

export const UserContext = createContext();
const host = import.meta.env.VITE_SERVER_HOST;

const UserState = (props) => {
  // Update the user info --------------------------
  const SaveUserInfo = async (data) => {
    const response = await fetch(`${host}/user/saveinfo`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Credentials": true,
        jwtToken: localStorage.getItem("jwtToken"),
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();
    console.log(result)
    return {success:result.success,error:result.error};
  };

  // Update the user info --------------------------
  const SentMessageFromSNS = async (number) => {
    const response = await fetch(
      `${host}/aws/sendMsg?message=Mobile Number&number=${number}&subject=Anchors`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "Access-Control-Allow-Credentials": true,
        },
      }
    );

    const result = await response.json();
    return result;
  };

  return (
    <UserContext.Provider value={{ SaveUserInfo, SentMessageFromSNS }}>
      {props.children}
    </UserContext.Provider>
  );
};

export default UserState;
