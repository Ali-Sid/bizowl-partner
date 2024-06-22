import React, { useState } from 'react'
import { Avatar, Box, Button, Flex, Icon, Img, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Progress, Tab, TabList, TabPanel, TabPanels, Tabs, Text } from "@chakra-ui/react";
import { HSeparator } from "components/separator/Separator";
import AvatarImg from "views/partner/project/assets/img/avatar1.png"
import { BsClock, BsThreeDotsVertical } from "react-icons/bs";
import { FaRegCalendarAlt } from 'react-icons/fa';
import { SlGraph } from "react-icons/sl";
import { GoBell } from 'react-icons/go';
import { TbSettingsCog, TbTag } from "react-icons/tb";
import { MdOutlinePriceChange } from 'react-icons/md';
import { LiaPercentageSolid } from "react-icons/lia";
import { VscBellSlash } from "react-icons/vsc";
import { FaSackDollar } from "react-icons/fa6";

const ProjectCard = ({ props }) => {

    const [openModal, setOpenModal] = useState(false);

    return (
        <>
            <Box
                p="1rem"
                mb="2rem"
                mr="1.3rem"
                borderRadius="2rem"
                backgroundColor={props?.backgroundColor}
                boxShadow="0.375rem 0.75rem 1.375rem 0px rgba(69, 90, 100, 0.35)"
                cursor="pointer"
                onClick={() => { setOpenModal(!openModal) }}
            >
                <Flex justifyContent="space-between">
                    <Text fontSize="12px">17 Jan 2024</Text>
                    <Icon as={BsThreeDotsVertical} />
                </Flex>
                <Flex
                    flexDirection="column"
                    justifyContent="center"
                    alignItems="center"
                >
                    <Text fontWeight="bold" fontSize="lg">{props?.category}</Text>
                    <Text fontSize="12px">{props?.subCategory}</Text>
                </Flex>
                <Flex
                    flexDirection="column"
                >
                    <Text fontSize="15px" fontWeight='bold'>Progress</Text>
                    <Box position="relative">
                        <Progress w="100%" value={props?.progress} colorScheme={props?.progressBarColor} />
                        <Text
                            position="absolute"
                            transform="translate(10%,-3px)"
                            right="0"
                            p="0.3rem"
                        >
                            {props?.progress}%
                        </Text>
                    </Box>
                </Flex>
                <HSeparator backgroundColor="white" marginTop="2rem" />
                <Flex mt="1rem" alignItems="center">
                    <Avatar src={AvatarImg} />
                    <Text w="6rem" ml="0.3rem" fontWeight="bold">First Name</Text>
                    <Flex
                        w="40%"
                        ml="2rem"
                        borderRadius="2rem"
                        backgroundColor="#FFFFFF"
                        justifyContent="center"
                        alignItems="center"
                    >
                        <Text color={props?.textColor} >2 Days Left</Text>
                    </Flex>
                </Flex>
            </Box>



            {/* Project Details Modal */}
            <Modal
                size="xl"
                isOpen={openModal}
                onClose={() => { setOpenModal(!openModal) }}
            >
                <ModalOverlay />
                <ModalContent
                    backgroundColor="#EBF2FA"
                >
                    <ModalHeader>Digitial Marketing</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Text>Details</Text>
                        <Flex pt="1rem" pb="1rem">
                            <Flex w="50%">
                                <Avatar size='sm' />
                                <Input ml="0.5rem" variant='flushed' placeholder='CustomerName' />
                            </Flex>
                            <Flex
                                w="50%"
                                alignItems="center"
                            >
                                <Icon as={TbSettingsCog} />
                                <Input ml="0.5rem" variant='flushed' placeholder='SEO' />
                            </Flex>
                        </Flex>
                        <Flex pt="1rem" pb="1rem">
                            <Flex
                                w="50%"
                                alignItems="center"
                            >
                                <Icon as={SlGraph} />
                                <Input ml="0.5rem" variant='flushed' placeholder='Banking & Finance' />
                            </Flex>
                            <Flex
                                w="50%"
                                alignItems="center"
                            >
                                <Icon as={FaRegCalendarAlt} />
                                <Input ml="0.5rem" variant='flushed' placeholder='24 Jan 2024 to 24 Feb 2024' />
                            </Flex>
                        </Flex>
                        <Text>Pricings</Text>
                        <Flex pt="1rem" pb="1rem">
                            <Flex
                                w="50%"
                                alignItems="center"
                            >
                                <Icon as={BsClock} />
                                <Input ml="0.5rem" variant='flushed' placeholder='2 Weeks' />
                            </Flex>
                            <Flex
                                w="50%"
                                alignItems="center">
                                <Icon as={GoBell} />
                                <Input ml="0.5rem" variant='flushed' placeholder='Immediately' />
                            </Flex>
                        </Flex>
                        <Flex
                            pt="1rem" pb="1rem"
                            w="50%"
                            alignItems="center"
                        >
                            <Icon as={TbTag} />
                            <Input variant='flushed' placeholder='Banking & Finance' />
                        </Flex>
                        <Text>Payment Details</Text>
                        <Flex pt="1rem" pb="1rem">
                            <Flex
                                w="50%"
                                alignItems="center"
                            >
                                <Icon as={MdOutlinePriceChange} />
                                <Input ml="0.5rem" variant='flushed' placeholder='25000' />
                            </Flex>
                            <Flex
                                w="50%"
                                alignItems="center"
                            >
                                <Icon as={LiaPercentageSolid} />
                                <Input ml="0.5rem" variant='flushed' placeholder='500' />
                            </Flex>
                        </Flex>
                        <Flex pt="1rem" pb="1rem">
                            <Flex
                                w="50%"
                                alignItems="center"
                            >
                                <Icon as={VscBellSlash} />
                                <Input ml="0.5rem" variant='flushed' placeholder='2000' />
                            </Flex>
                            <Flex
                                w="50%"
                                alignItems="center"
                            >
                                <Icon colorSchema="#89664C" as={FaSackDollar} />
                                <Input ml="0.5rem" variant='flushed' placeholder='22500' />
                            </Flex>
                        </Flex>
                        <Text mt="0.8rem" mb="0.8rem">Project Requirement</Text>
                        <HSeparator boxShadow="0px 0.25rem 0.25rem 0px rgba(0, 0, 0, 0.4)" />
                        <Text mt="0.8rem" mb="0.8rem" fontSize="sm">We are facing a lot of problem in our orgainc growth and we want somenone to improve it.
                            This is our requirement.</Text>
                        <HSeparator boxShadow="0px 0.25rem 0.25rem 0px rgba(0, 0, 0, 0.4)" />
                        <Text mt="1rem" mb="1rem">Payment Structure</Text>
                        <Flex justifyContent="space-between">
                            <Box w="25%" mr="0.5rem" textAlign="center" backgroundColor="#FFF9EA" color="#F3AD05">25</Box>
                            <Box w="25%" mr="0.5rem" textAlign="center" backgroundColor="#FFEEF8" color="#D42D91">25</Box>
                            <Box w="25%" mr="0.5rem" textAlign="center" backgroundColor="#E5E6F9" color="#407BFF">25</Box>
                            <Box w="25%" mr="0.5rem" textAlign="center" backgroundColor="#E1F3EF" color="#06D2A6">25</Box>
                        </Flex>
                        <Flex
                            mt="1rem" pm="1rem"
                            flexDirection="column"
                        >
                            <Text mb="1rem">Progress Meter</Text>
                            <Box position="relative">
                                <Progress w="100%" value="80" />
                                <Text
                                    position="absolute"
                                    transform="translate(10%,-3px)"
                                    fontWeight="bold"
                                    right="0"
                                    p="0.3rem"
                                >
                                    80%
                                </Text>
                            </Box>
                        </Flex>
                        <Flex
                            pt="1rem" pb="1rem"
                            alignItems="center"
                        >
                            <Text>Update Progress</Text>
                            <Input
                                w="15%"
                                mr="0.5rem"
                                ml="0.5rem"
                                backgroundColor="#FFFFFF"
                                border="1px solid"
                                borderColor="black"
                                borderRadius="1rem"
                            />
                            <Text>%</Text>
                        </Flex>
                    </ModalBody>
                    <Text ml="1.5rem">Payment Status</Text>
                    <ModalFooter
                        display="flex"
                        justifyContent="flex-start"
                        color="#FFFFFF"
                    >
                        <Button backgroundColor="#65C756">Received</Button>
                        <Button ml="1rem" backgroundColor="#F28F8F">Pending</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

export default ProjectCard
