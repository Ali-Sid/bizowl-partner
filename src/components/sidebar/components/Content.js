// chakra imports
import { Box, Flex, Icon, Stack, Text, toast } from "@chakra-ui/react";
import { HSeparator } from "components/separator/Separator";
//   Custom components
import Brand from "components/sidebar/components/Brand";
import Links from "components/sidebar/components/Links";
import SidebarCard from "components/sidebar/components/SidebarCard";
import React from "react";
import { MdOutlineLogout, MdOutlineSupport } from "react-icons/md";
import { HStack, useColorModeValue } from "@chakra-ui/react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { auth } from "config/firebase";

// FUNCTIONS

function SidebarContent(props) {
  const { routes } = props;
  const history = useHistory();
  const handleLogout = () => {
    try {
      auth.signOut().then(() => {
        // Clear the authentication state
        localStorage.removeItem("currentUser"); // or whatever storage you're using
        // Clear browser history and cache
        window.history.forward();
        history.replace("/login"); // Replace the current history entry with the login page
      });
      history.push("/login");
      toast({
        description: "Logout Successfully",
        status: "success",
        position: "top",
        duration: 1000,
        isClosable: true,
      });
    } catch (error) {
      console.error("Error during logout:", error.message);
    }
  };
  // SIDEBAR
  return (
    <Flex
      direction="column"
      height="100%"
      pt="25px"
      px="16px"
      borderRadius="5rem"
      alignItems="center"
      justifyContent="center"
    >
      <Brand />
      <Stack direction="column" mb="auto" mt="8px">
        <Box ps="20px" pe={{ md: "16px", "2xl": "1px" }}>
          <Links routes={routes} />
        </Box>
      </Stack>
      <HSeparator mb="20px" />
      <Box
        me="18px"
        mb="1.5rem"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "56%",
          cursor: "pointer",
        }}
      >
        <Icon
          as={MdOutlineSupport}
          width="20px"
          height="20px"
          color="inherit"
          marginRight="1rem"
        />
        <Text me="auto">Support</Text>
      </Box>
      <Box
        me="18px"
        mb="1.5rem"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "56%",
          cursor: "pointer",
        }}
        onClick={handleLogout}
      >
        <Icon
          as={MdOutlineLogout}
          width="20px"
          height="20px"
          color="inherit"
          marginRight="1rem"
        />
        <Text me="auto">Log Out</Text>
      </Box>

      {/* <Box
        mt='60px'
        mb='40px'
        borderRadius='30px'>
        <SidebarCard />
      </Box> */}
    </Flex>
  );
}

export default SidebarContent;
