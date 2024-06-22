import React, { useEffect, useState } from "react";
import logo from "assets/img/layout/logo-of-BIZOWL--Business-Services.png"
import ProfileIcon from "../../../assets/img/sidebar/pajamas_profile.svg";
// Chakra imports
import { Flex, Icon, useColorModeValue } from "@chakra-ui/react";
import { collection, onSnapshot, query, where } from 'firebase/firestore'
import { db } from 'config/firebase'
// Custom components
// import { HorizonLogo } from "components/icons/Icons";
import { HSeparator } from "components/separator/Separator";

function SidebarBrand() {
  const [partnerProfile, setPartnerProfile] = useState({})
    const [unSubscribe, setUnSubscribe] = useState(null)

    useEffect(() => {
        getPartnerProfile();
        return () => {
            if (unSubscribe) {
                unSubscribe();
            }
        };
    }, []);

    const getPartnerProfile = async () => {
        try {
            const partnerUid = sessionStorage.getItem('uid')
            const queryForGetPartner = query(collection(db, "partners"), where("uid", "==", partnerUid));
            const subScribe = onSnapshot(queryForGetPartner, (snapshot) => {
                const partnerData = snapshot.docs[0]?.data();
                setPartnerProfile(partnerData)
            });
            setUnSubscribe(() => subScribe)
        } catch (error) {
            console.log(error.message)
        }
    }

  const [ partnerName, setPartnerName ] = useState("Omraj");
  //   Chakra color mode
  // let logoColor = useColorModeValue("navy.700", "white");

  return (
    <Flex align='center' direction='column'>
      {/* <HorizonLogo h='26px' w='175px' my='32px' color={logoColor} /> */}
      <a href="https://www.bizzowl.com">
      <img src={logo} alt="Bizowl-logo" height="26px" width="175px" style={{margin: "32px 0"}} />
      </a>
      <img src={ProfileIcon} style={{width:"4rem"}} />
      <h1 style={{marginTop:"1rem", fontWeight:"bold",fontSize:"1.5rem"}}>Hello, {partnerProfile?.firstName ?? "Partner"} !</h1>
      <HSeparator mb='20px' />
    </Flex>
  );
}

export default SidebarBrand;
