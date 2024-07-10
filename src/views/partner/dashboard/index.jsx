import {
    Avatar,
    Box,
    Button,
    Flex,
    FormLabel,
    Icon,
    Img,
    Select,
    SimpleGrid,
    Tab,
    TabList,
    TabPanel,
    TabPanels,
    Tabs,
    Text,
    useColorModeValue,
} from "@chakra-ui/react";
import React, { useEffect, useState } from 'react';
import { DashboardData } from './data/DashboardData';
import MiniCalendar from "components/calendar/MiniCalendar";
import { HSeparator } from "components/separator/Separator";
import { Cards } from "./data/DashboardData";
import Card from "components/card/Card";
import VectorImg from "./assets/Vector.png"
import ExclusivenessImg from './assets/exclusiveness.png';
import ProfilePic from './assets/Ellipse 658.png'
import AuthenticImg from './assets/authentic.png';
import FlexibleImg from './assets/flexible.png'
import CustomCard from "./components/CustomCard";
import { VSeparator } from "components/separator/Separator";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { MdCheckCircleOutline } from "react-icons/md";
import { IoIosArrowDropdownCircle } from "react-icons/io";
import { ChatData } from "./data/DashboardData";
import { ChevronDownIcon } from "@chakra-ui/icons";

const PartnerDashboard = () => {

    const [dashboardData, setDashboardData] = useState([]);
    const [cardData, setCardData] = useState([]);
    const [chatData, setChatData] = useState([]);
    const [currentTab, setCurrentTab] = useState("meetings");

    useEffect(() => {
        setDashboardData(DashboardData);
        setCardData(Cards);
        setChatData(ChatData);
    }, [])
    return (
        <>
            <Flex justifyContent="space-between" mb="2rem">
                <Flex
                    p="1rem"
                    alignItems="center"
                    justifyContent="center"
                    width="63%"
                    bgColor="#E1F2EF"
                    borderRadius="1rem"
                >
                    <Flex w="80%" flexDirection="column">
                        <Text fontSize="1.5rem"
                            fontWeight="bold"
                            color="#1B2559"
                        >
                            Welcome back, Partner
                        </Text>
                        <Text fontSize="sm">
                            Be the part of something good.
                            Get more customers without the hassles of finding new ones.
                            We bring and you deliver.
                        </Text>
                    </Flex>
                    <Flex>
                        <Img src={VectorImg} alt="Vector Img" w="10rem" h="10rem" />
                    </Flex>
                </Flex>
                <Flex
                    p="1rem 0rem 0rem 1rem"

                    //alignItems="center"
                    borderRadius="1rem"
                    flexDirection="column"
                    width="33%"
                    boxShadow="0rem 0.25rem 0.25rem 0rem rgba(0, 0, 0, 0.25)"
                >
                    <div
                        style={{
                            color: "#1B2559",
                            fontSize: "1.5rem",
                            fontWeight: "bold",
                            bgColor: "#F7F8FD"
                        }}
                    >
                        <h1>Total Earnings</h1>
                        <p>0 INR</p>
                    </div>
                    <Text w="max-content" fontSize="sm" cursor="pointer">View History</Text>
                    <HSeparator />
                </Flex>
            </Flex>
            <Flex
                alignItems="center"
                justifyContent="space-between"
                mb="2rem"
            >
                <Text fontSize="1.5rem" fontWeight="bold">Analytics</Text>
                <Flex
                    width="16%"
                    height="5vh"
                    alignItems="center"
                    justifyContent="center"
                    bgColor="#D7E9FD"
                    marginBottom="1rem"
                    borderRadius="1rem"
                >
                    <Select
                        placeholder='Select option'
                        colorScheme="#1C6ED059"
                        border="none"
                        borderRadius="2rem"
                        cursor="pointer"
                        iconColor="#FFFFFF"
                        icon={<Icon as={ChevronDownIcon} backgroundColor="#1C6ED0" height="55%" borderRadius="2rem" />}
                        style={{ backgroundColor: "#D7E9FD", boxShadow: "0px 4px 4px 0px #00000040" }}
                    >
                        <option value='7days'>Last 7 days</option>
                        <option value='1month'>Last month</option>
                        <option value='1year'>Last year</option>
                    </Select>
                </Flex>
            </Flex>
            <Flex flexWrap='wrap' justifyContent="space-between" mb="3rem">
                {cardData.map((card, index) => (
                    <CustomCard key={index} card={card} />
                ))}
            </Flex>
            <Flex
                flexDirection="column"
                height="60vh"
                alignItems="center"
                color="#37474F"
                padding="1rem"
                boxShadow="0.0625rem 0.0625rem 0.25rem 0rem rgba(64, 123, 255, 0.43) inset"
                borderRadius="2rem"
            >
                <Text fontWeight="bold" fontSize="1.7rem" marginBottom="1rem">Boost Your Visiblity</Text>
                <Flex>
                    <Flex flexDirection="column" alignItems="center">
                        <Text fontWeight="bold" fontSize="1.7rem">Exclusiveness</Text>
                        <Img src={ExclusivenessImg} alt="ExclusivenessImg" style={{ width: "10rem" }} />
                        <Text m="1rem">
                            Always try to give exclusive price to
                            user requesting their service on Bizowl.
                            This will get you more clients,.</Text>
                    </Flex>
                    <VSeparator />
                    <Flex flexDirection="column" alignItems="center">
                        <Text fontWeight="bold" fontSize="1.7rem">Authentic</Text>
                        <Img src={AuthenticImg} alt="AuthenticImg" style={{ width: "7rem" }} />
                        <Text m="1rem">
                            Try to be more authentic and
                            believe in provide value. Provide
                            your best work, top quality work.
                        </Text>
                    </Flex>
                    <VSeparator />
                    <Flex flexDirection="column" alignItems="center">
                        <Text fontWeight="bold" fontSize="1.7rem">Flexible</Text>
                        <Img src={FlexibleImg} alt="FlexibleImg" style={{ width: "7rem" }} />
                        <Text m="1rem">
                            People who are ideal customer of
                            bizowl are early stage startup, Low
                            budget client. Be flexible.
                        </Text>
                    </Flex>
                </Flex>
            </Flex>
            {/* <MiniCalendar h='100%' minW='100%' selectRange={false} /> */}
            <Flex mt="3rem" justifyContent="space-between">
                <Box
                    backgroundColor="#FFFFFF"
                    width="55%"
                    height="110vh"
                    borderRadius="0.6rem"
                >
                    <Flex
                        pl="1rem"
                        pr="1rem"
                        fontWeight="bold"
                        justifyContent="space-between"
                        alignItems="center"
                        height="4rem"
                        backgroundColor="#E1F2EF"
                        borderRadius="0.9rem"
                    >
                        <Text>Inbox</Text>
                        <Text>View All</Text>
                    </Flex>
                    {chatData.map((item, index) => {
                        return (
                            <Box key={index}>
                                {/* <Flex p="1.5rem">
                                    <Avatar src={ProfilePic} alt="Profile Pic" />
                                    <Flex
                                        ml="1rem"
                                        flexDirection="column"
                                    >
                                        <Text fontWeight="bold">{item?.clientName}</Text>
                                        <Text fontSize="sm">{item?.message}</Text>
                                    </Flex>
                                </Flex> */}
                                {/* <HSeparator /> */}
                            </Box>
                        )
                    })}

                </Box>
                <Box
                    backgroundColor={currentTab === "meetings" ? "#FFFFFF" : "#F0F0F0"}
                    width="40%"
                    height="110vh"
                    borderRadius="0.6rem"
                    position="relative"
                >
                    <Tabs
                        position="absolute"
                        variant='unstyled'
                        width="100%"
                        pl="1rem"
                        pr="1rem"
                        height="4rem"
                        backgroundColor={currentTab === "meetings" ? "#E1F2EF" : "#D9D9D9"}
                        borderRadius="0.9rem"
                    >
                        <TabList
                            display="flex"
                            justifyContent="space-between"
                            alignItems="center"
                            paddingTop="1rem"
                        >
                            <Tab id="meetings" fontWeight="bold" onClick={() => setCurrentTab("meetings")}>Meetings</Tab>
                            <Tab id="calendar" fontWeight="bold" onClick={() => setCurrentTab("calendar")}>Calendar</Tab>
                        </TabList>
                        <TabPanels>
                            <TabPanel>
                                {/* <Flex justifyContent="space-between">
                                    <Box backgroundColor="#407BFFE5" borderRadius="2rem" padding="0.5rem 1.5rem 0.5rem 1.5rem">Upcoming</Box>
                                    <Box backgroundColor="#D9D9D9" borderRadius="2rem" padding="0.5rem 1.5rem 0.5rem 1.5rem" >Past</Box>
                                </Flex> */}
                                {dashboardData.map((item, index) => (
                                    <Box
                                        key={index}
                                        p="1rem"
                                        mt="1.5rem"
                                        height="auto"
                                        borderRadius="1rem"
                                        // boxShadow="0.4375rem 0rem 0.25rem 0rem rgba(64, 123, 255, 0.65),-0.4375rem 0rem 0.25rem 0rem rgba(64, 123, 255, 0.65)"
                                    >
                                        {/* <Flex>
                                            <Avatar src={ProfilePic} />
                                            <Flex
                                                ml="1rem"
                                                flexDirection="column">
                                                <h1 style={{ fontWeight: "bold" }}>{item?.name}</h1>
                                                <p style={{ fontSize: "0.6rem" }}>{item?.service}</p>
                                            </Flex>
                                        </Flex>
                                        <Text ml="0.8rem" fontSize="0.68rem">Meeting regarding digital marketing project, Timelines
                                            deciding point. FAQ asked.</Text>
                                        <Text mt="0.4rem" fontSize='0.7rem' fontWeight="bold">
                                            <span style={{ marginLeft: "0.8rem", marginRight: "1rem" }}>{item.startTime}</span>
                                            <span>{item?.startDate}</span>
                                        </Text>
                                        <Flex
                                            justifyContent="space-between">
                                            <Flex
                                                alignItems="center"
                                                padding="0.2rem 1rem 0.2rem 1rem"
                                                borderRadius="1rem"
                                                backgroundColor="#86F477B0"
                                                fontSize="15px"
                                                boxShadow="0rem 0.25rem 0.25rem 0rem rgba(0, 0, 0, 0.25)"
                                            >
                                                <Icon mr="0.5rem" as={MdCheckCircleOutline} color="#50C878" />
                                                <span>Going</span>
                                            </Flex>
                                            <Flex
                                                alignItems="center"
                                                padding="0.2rem 1rem 0.2rem 1rem"
                                                borderRadius="1rem"
                                                backgroundColor="#FB83838F"
                                                boxShadow="0rem 0.25rem 0.25rem 0rem rgba(0, 0, 0, 0.25)"
                                            >
                                                <Icon mr="0.5rem" as={AiOutlineCloseCircle} color="#DE3163" />
                                                Cancel
                                            </Flex>
                                        </Flex> */}
                                    </Box>
                                ))}

                            </TabPanel>
                            <TabPanel marginTop="1rem">
                                <MiniCalendar h='100%' minW='100%' selectRange={false} />
                            </TabPanel>
                        </TabPanels>
                    </Tabs>
                </Box>
            </Flex>
        </>
    )
}

export default PartnerDashboard
