import React from "react";
import { NextPage } from "next";

const Login: NextPage = () => {
  const setAuthentication = async () => {
    const response = await fetch("api/login", { method: "POST" });

    if (response.ok) window.location.replace("/secure");
    else console.log("error");
  };

  return (
    <>
      <div>Login</div>
      <button onClick={() => setAuthentication()}>Login</button>
    </>
  );
};

export default Login;
