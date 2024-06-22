import React from 'react'
import { Avatar, Icon, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader } from "@chakra-ui/react";
import { BsClock } from "react-icons/bs";
import { FaRegCalendarAlt } from 'react-icons/fa';
import { SlGraph } from "react-icons/sl";
import { GoBell } from 'react-icons/go';
import { TbSettingsCog, TbTag } from "react-icons/tb";
import { MdOutlinePriceChange } from 'react-icons/md';
import { LiaPercentageSolid } from "react-icons/lia";
import { VscBellSlash } from "react-icons/vsc";
import { FaSackDollar } from "react-icons/fa6";
import { HSeparator } from 'components/separator/Separator';
import { Box, Button, Flex, ModalOverlay, Progress, Text, } from '@chakra-ui/react'


const ProjectDetailsModal = ({ openModal, setOpenModal }) => {
    return (
        <div>
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
        </div>
    )
}

export default ProjectDetailsModal
