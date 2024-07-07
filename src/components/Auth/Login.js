import React from "react";
import LoginForm from "./utils/login/LoginForm";
import { useMediaQuery } from "@mui/material";
import LeftBoxContent from "./utils/login/LeftBoxContent";
import signinImage from "assets/img/auth/4957136.jpg";

function Login() {
  const isMobile = useMediaQuery("(max-width:600px)");
  return (
    <>
      {isMobile ? (
        <LoginForm />
      ) : (
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            width: "100%",
            height: "100vh",
            overflowY: "hidden",
          }}
        >
          <div
            style={{
              width: "60%",
              margin: "10px",
              padding: "50px",
              borderRadius: "25px",
              overflow: "hidden",
              // backgroundColor: "#182b3a",
              backgroundImage: `url(${signinImage})`,
              backgroundSize: "cover",
            }}
          >
            <LeftBoxContent />
          </div>
          <div style={{ width: "40%", overflowY: "auto" }}>
            <LoginForm />
          </div>
        </div>
      )}
    </>
  );
}

export default Login;
