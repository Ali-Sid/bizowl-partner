import { useMediaQuery } from "@mui/material";
import React from "react";
import SignupForm from "./utils/signup/SignupForm";
import LeftBoxContent from "./utils/signup/LeftBoxContent";

const Register = () => {
  const isMobile = useMediaQuery("(max-width:600px)");

  return (
    <>
      {isMobile ? (
        <SignupForm />
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
              backgroundColor: "#182b3a",
              backgroundImage:
                "linear-gradient(315deg, #182b3a 0%, #203bf3 74%)",
            }}
          >
            <LeftBoxContent />
          </div>
          <div style={{ width: "40%", overflowY: "auto" }}>
            <SignupForm />
          </div>
        </div>
      )}
    </>
  );
};

export default Register;
