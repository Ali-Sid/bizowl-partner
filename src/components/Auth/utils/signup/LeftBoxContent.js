import React from "react";
import BizowlLogo from "assets/img/layout/logoWhite.png";
import { Box, Text } from "@chakra-ui/react";

const LeftBoxContent = () => {
  return (
    <div style={{ height: "100%" }}>
      <div style={{ height: "40%" }}>
        <img src={BizowlLogo} width="150px" alt="logo" />
      </div>
      <div style={{ display: "flex", flexDirection: "column", height: "60%" }}>
        <div
          style={{
            borderRadius: "25px",
            backgroundColor: "rgba(255, 255, 255, 0.3)",
            padding: "15px",
            width: "fit-content",
          }}
        >
          <Text fontSize="xs" color="#fff">
            Join Us to Build 🤩
          </Text>
        </div>
        <div style={{ marginTop: "10px" }}>
          <Text fontSize="3xl" color="#fff">
            Start Your Journey
          </Text>
          <Text fontSize="md" color="#fff">
            Follow this simple steps to set up your account
          </Text>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            marginTop: "50px",
            height: "30vh",
            gap: "20px",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              backgroundColor: "#fff",
              borderRadius: "20px",
              padding: "20px",
              height: "100%",
              width: "33.33%",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "flex-start",
                width: "35px",
                borderRadius: "50px",
                backgroundColor: "blue",
                padding: "5px",
                justifyContent: "center",
                textAlign: "center",
              }}
            >
              <Text color="#fff">1</Text>
            </div>
            <div style={{ display: "flex", alignItems: "flex-end" }}>
              <Text fontSize="md">Register your account</Text>
            </div>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              backgroundColor: "rgba(255, 255, 255, 0.3)",
              borderRadius: "20px",
              padding: "20px",
              height: "100%",
              width: "33.33%",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "flex-start",
                width: "35px",
                borderRadius: "50px",
                // backgroundColor: "blue",
                border: "1px solid #ccc",
                padding: "5px",
                justifyContent: "center",
                textAlign: "center",
              }}
            >
              <Text color="#fff">2</Text>
            </div>
            <div style={{ display: "flex", alignItems: "flex-end" }}>
              <Text fontSize="md" color="#fff">
                Setup your profile information
              </Text>
            </div>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              backgroundColor: "rgba(255, 255, 255, 0.3)",
              borderRadius: "20px",
              padding: "20px",
              height: "100%",
              width: "33.33%",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "flex-start",
                width: "35px",
                borderRadius: "50px",
                // backgroundColor: "blue",
                border: "1px solid #ccc",
                padding: "5px",
                justifyContent: "center",
                textAlign: "center",
              }}
            >
              <Text color="#fff">3</Text>
            </div>
            <div style={{ display: "flex", alignItems: "flex-end" }}>
              <Text fontSize="md" color="#fff">
                Verify your Identity through a valid ID
              </Text>
            </div>
          </Box>
        </div>
      </div>
    </div>
  );
};

export default LeftBoxContent;
