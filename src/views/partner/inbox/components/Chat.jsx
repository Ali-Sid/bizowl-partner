import { Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Avatar, Box, Button, Flex, Icon, Text } from '@chakra-ui/react'
import { SearchBar } from 'components/navbar/searchBar/SearchBar'
import React, { useEffect, useState } from 'react';
import ProfilePic from '../assets/Ellipse 658.png';
import { ChatData } from '../data/InboxData';
import { HSeparator } from 'components/separator/Separator';
import { MdOutlineVideocam } from 'react-icons/md';
import { IoCallOutline } from 'react-icons/io5';
import { RxCross2 } from "react-icons/rx";
import { BiAddToQueue } from "react-icons/bi";
import { HiMiniPaperClip } from "react-icons/hi2";
import { BsEmojiSmile } from "react-icons/bs";

const Chat = () => {

    const [chatData, setChatData] = useState([]);

    useEffect(() => {
        setChatData(ChatData);
    }, [])

    return (
        <Flex
            p="1rem 0.3rem"
            border="1px solid #00000033"
            borderRadius="1rem"
            minHeight="30rem"
            boxShadow="0.25rem 0.25rem 0.25rem 0rem rgba(64, 123, 255, 0.25)"
            justifyContent="space-between"
        >
            <Box
                width="30%"
            >
                <SearchBar background={'#D7E9FD'} placeholder={"Search"}  style={{width:"100%" }}/>
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
                            </Flex>
                            <HSeparator /> */}
                        </Box>
                    )
                })}
            </Box>
            <Box
                ml="1rem"
                width="38%"
            >
                {/* <Flex
                    justifyContent="space-between"
                    alignItems="center"
                >
                    <Flex>
                        <Avatar src={ProfilePic} alt="Profile Pic" />
                        <Box ml="0.5rem">
                            <Text fontSize="lg" fontWeight="bold">Apoorva Rathi</Text>
                            <Text>Online</Text>
                        </Box>
                    </Flex>
                    <Flex ml="3rem">
                        <Icon as={MdOutlineVideocam} color="blue" />
                        <Icon as={IoCallOutline} ml="1rem" color="blue" />
                    </Flex>
                </Flex> */}
                {/* <Flex pt="3rem" flexDirection="column">
                    <Flex
                        color="white"
                        p="1rem"
                        width="70%"
                        borderRadius="0.625rem 0.625rem 1.25rem 0rem"
                        bgColor="#455A64B2"

                    >
                        <Text>Your price is higher than other offer i got. c</Text>
                    </Flex>
                    <Text fontSize="0.8rem">9:12PM</Text>
                </Flex> */}
                {/* <Flex
                    pt="1rem"
                    flexDirection="column"
                    alignItems="flex-end"
                >
                    <Flex
                        color="white"
                        p="1rem"
                        width="70%"
                        borderRadius="0.625rem 0.625rem 0rem 1.25rem"
                        bgColor="#407BFFE5"

                    >
                        <Text>Your price is higher than other offer i got. c</Text>
                    </Flex>
                    <Text fontSize="0.8rem" pr="1rem">9:12PM<span style={{ fontWeight: "bold", paddingLeft: "0.6rem" }}>You</span></Text>
                </Flex> */}
                {/* <Flex
                    mt="30rem"
                    p="0.5rem 1rem"
                    alignItems="center"
                    height="3rem"
                    bgColor="#E1F2EF"
                    borderRadius="1rem"

                >
                    <Icon as={BiAddToQueue} />
                    <Icon as={HiMiniPaperClip} ml="1rem" />
                    <Icon as={BsEmojiSmile} ml="1rem" />
                    <Button ml="10rem" bgColor="#1C6ED0BF">Send</Button>
                </Flex> */}
            </Box>
            <Box
                ml="1rem"
                width="30%"
            >
                {/* <Flex justifyContent="flex-end">
                    <Icon as={RxCross2} color="blue" />
                </Flex>

                <Flex
                    mt="2rem"
                    flexDirection="column"
                    justifyContent="center"
                    alignItems="center"
                >
                    <Avatar src={ProfilePic} alt="Profile Pic" />
                    <Text fontSize="lg" fontWeight="bold">Apoorva Rathi</Text>
                    <Text color="#2EB123">Online</Text>
                </Flex>
                <Accordion allowToggle>
                    <AccordionItem>
                        <h2>
                            <AccordionButton>
                                <Box as="span" flex='1' textAlign='left'>
                                    <Text fontWeight="bold">Files</Text>
                                    <Text fontSize="xs">2 Files</Text>
                                </Box>
                                <AccordionIcon />
                            </AccordionButton>
                        </h2>
                        <AccordionPanel pb={4}>
                            <Text>Sampleswork.docx</Text>
                            <Text>Sampleswork.pdf</Text>
                        </AccordionPanel>
                    </AccordionItem>

                    <AccordionItem>
                        <h2>
                            <AccordionButton>
                                <Box as="span" flex='1' textAlign='left'>
                                    <Text fontWeight="bold">Images</Text>
                                    <Text fontSize="xs">4 Photos</Text>
                                </Box>
                                <AccordionIcon />
                            </AccordionButton>
                        </h2>
                        <AccordionPanel pb={4}>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                            tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
                            veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
                            commodo consequat.
                        </AccordionPanel>
                    </AccordionItem>
                </Accordion> */}
            </Box>
        </Flex>
    )
}

export default Chat
