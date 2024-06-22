import { Box, Button, Flex, FormControl, FormLabel, Icon, IconButton, Img, Input, Menu, MenuButton, MenuItem, MenuList, Modal, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Select, Text } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { BsThreeDotsVertical } from 'react-icons/bs'
import FileImage from "../assets/File-Preview 1.png"
import { LuCalendarDays, LuEye } from "react-icons/lu";
import { ModalBody } from 'react-bootstrap'
import { GoPaperclip } from 'react-icons/go'
import { serviceOptions, budgetOption, industryOption, subCategoryServicesData } from 'utils/constant'
import { useFormik } from 'formik'
import * as yup from 'yup';
import {  doc, updateDoc } from 'firebase/firestore';
import { db } from 'config/firebase';
import { MdDelete } from 'react-icons/md';

const validatePortfolioSchema = yup.object().shape({
    clientName: yup.string().required("Client Name is Required"),
    projectName: yup.string().required("Project Name is Required"),
    description: yup.string().required("Description is Required"),
    budget: yup.string().required("Budget is Required"),
    service: yup.string().required("Service is  Required"),
    subCategoryService: yup.string().required("Service is  Required"),
    industry: yup.string().required("Industry is Required")
})
const PortfolioCard = ({ portfolio }) => {
    const [addPortfolioModalOpen, setAddPortfolioModalOpen] = useState(false);
    const [viewDetailsModalOpen, setViewDetailsModalOpen] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const editPortfolio = async (values, actions) => {
        try {
            const portfolioDocRef = doc(db, "portfolio", portfolio?.id);
            await updateDoc(portfolioDocRef, values);
            setAddPortfolioModalOpen(false)
            actions.resetForm()
        } catch (error) {
            console.log(error.message)
        }
    }
    const formik = useFormik({
        initialValues: {
            clientName: portfolio?.clientName,
            projectName: portfolio?.projectName,
            description: portfolio?.description,
            budget: portfolio?.budget,
            endDate: portfolio?.endDate,
            service: portfolio?.service,
            subCategoryService: portfolio?.subCategoryService ?? [],
            proofOfWork: portfolio?.proofOfWork
        },
        validationSchema: validatePortfolioSchema,
        onSubmit: editPortfolio
    })

    useEffect(() => {
        formik.setValues(portfolio)
    }, [portfolio, addPortfolioModalOpen])

    const handleDelete = () => {
        // Implement your delete logic here
        console.log("Deleting portfolio:", portfolio);
    };
    return (
        <>
            <Box
                mt="1rem"
                w="30%"
                borderRadius={'1rem'}
                marginBottom={'1.2rem'}
                margin={'1.5%'}
                boxShadow={'0rem 0.25rem 0.25rem 0rem rgba(0, 0, 0, 0.25)'}
                backgroundColor="#FFFFFF">
                <Flex m="1rem" justifyContent="space-between" alignItems="center">
                    <Text fontWeight="bold">{portfolio?.projectName}</Text>
                    {/* <Icon as={BsThreeDotsVertical} onClick={() => setIsMenuOpen(!isMenuOpen)} cursor={'pointer'} /> */}
                    <Menu>
                        <MenuButton
                            as={IconButton}
                            aria-label='Options'
                            icon={<BsThreeDotsVertical />}
                            maxWidth="1rem"
                        />
                        <MenuList>
                            <MenuItem icon={<MdDelete />} onClick={handleDelete} style={{maxWidth:'1rem'}}>
                                Delete
                            </MenuItem>
                        </MenuList>
                    </Menu>
                </Flex>
                <Flex
                    m="1rem"
                    justifyContent="center"
                    alignItems="center"
                    borderRadius="1rem"
                    backgroundColor="#D7E9FD"
                >
                    <Img src={FileImage} width="8rem" height="10rem" />
                </Flex>
                <Flex
                    ml="1rem"
                    mr="1rem"
                    justifyContent="space-between"
                >
                    <Text>{portfolio?.clientName}</Text>
                    <Flex
                        alignItems="center"
                        onClick={() => { setAddPortfolioModalOpen(!addPortfolioModalOpen) }}
                        cursor={'pointer'}
                    >
                        <Icon as={LuEye} />
                        <Text>View Details</Text>
                    </Flex>
                </Flex>
                <Text ml="1rem" color="#007CFF">{portfolio?.service}</Text>
                <Flex
                    ml="1rem"
                    mb='1rem'
                >
                    <Icon as={LuCalendarDays} m='0.2rem' />
                    <Text>{portfolio?.endDate}</Text>
                </Flex>
            </Box>
            <Modal
                isOpen={addPortfolioModalOpen}
                onClose={() => { setAddPortfolioModalOpen(!addPortfolioModalOpen); formik.handleReset() }}
            >
                <ModalOverlay />
                <ModalContent
                    backgroundColor="#EBF2FA"
                >
                    <ModalHeader>Edit Portfolio</ModalHeader>
                    <ModalCloseButton />
                    <form onSubmit={formik.handleSubmit}>
                        <ModalBody style={{ marginLeft: "1rem", marginRight: "1rem" }}>
                            <FormControl
                                w="100%%"
                                mb='4'
                            >
                                <Text mb='2'>Project Name</Text>
                                <Input
                                    id="projectName"
                                    style={{ backgroundColor: "white" }}
                                    name="projectName"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.projectName}
                                />
                            </FormControl>
                            <FormControl
                                w="100%%"
                                mb='4'
                            >
                                <Text mb='2'>Client Name</Text>
                                <Input
                                    id="clientName"
                                    style={{ backgroundColor: "white" }}
                                    name="clientName"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.clientName}
                                />
                            </FormControl>
                            <FormControl
                                w="100%%"
                                mb='4'
                            >
                                <Text mb='2'>Description</Text>
                                <Input
                                    id="description"
                                    minH="5rem"
                                    style={{ backgroundColor: "white" }}
                                    name="description"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.description}
                                />
                            </FormControl>
                            <FormControl
                                w="100%%"
                                mb='4'
                            >
                                <Text mb='2'>Complete Date</Text>
                                <Input
                                    id="endDate"
                                    style={{ backgroundColor: "white" }}
                                    name="endDate"
                                    type="date"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.endDate}
                                />
                            </FormControl>
                            <FormControl>
                                <Text mb='2'>Service</Text>
                                <Select
                                    mb='4'
                                    placeholder='Select Service'
                                    name="service"
                                    backgroundColor="white"
                                    value={formik.values.service}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                >
                                    {
                                        serviceOptions?.map((item, index) => {
                                            return (
                                                <option value={item.value} key={index} fontSize="sm"
                                                    fontWeight="500">{item.label}</option>
                                            )
                                        })
                                    }
                                </Select>
                            </FormControl>
                            {subCategoryServicesData?.filter((service) => formik.values?.service in service).length > 0 && (
                                <FormControl>
                                    <Text mb='2'>Service Subcategory</Text>
                                    <Select
                                        mb='4'
                                        placeholder='Select Service Category'
                                        backgroundColor="white"
                                        name="subCategoryService"
                                        value={formik.values.subCategoryService}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                    >

                                        {
                                            subCategoryServicesData
                                                .filter((service) => formik?.values?.service in service)
                                                .map((option, index) => (option[formik?.values?.service]))
                                                .flat()
                                                .map((category, index) => (
                                                    <option key={index} value={category?.value}>{category?.label}</option>
                                                ))}

                                    </Select>
                                </FormControl>
                            )}

                            <FormControl>
                                <Text mb='2'>Budget</Text>
                                <Select
                                    mb='4'
                                    placeholder='Select Budget'
                                    backgroundColor="white"
                                    name="budget"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.budget}
                                >
                                    {
                                        budgetOption?.map((item, index) => {
                                            return (
                                                <option value={item.value} key={index} fontSize="sm"
                                                    fontWeight="500">{item.label}</option>
                                            )
                                        })
                                    }
                                </Select>
                            </FormControl>

                            <FormControl>
                                <Text mb='2'>Industry</Text>
                                <Select
                                    mb='4'
                                    placeholder='Select Industry'
                                    backgroundColor="white"
                                    name="industry"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.industry}
                                >
                                    {
                                        industryOption?.map((item, index) => {
                                            return (
                                                <option value={item.value} key={index} fontSize="sm"
                                                    fontWeight="500">{item.label}</option>
                                            )
                                        })
                                    }
                                </Select>
                            </FormControl>
                            <FormControl w="45%">
                                <FormLabel htmlFor='proofOfWork'>Proof Of Work</FormLabel>
                                <Flex
                                    alignItems="center"
                                >
                                    <Icon color="#1C6ED0" as={GoPaperclip} />
                                    <Input
                                        size="sm"
                                        width='auto'
                                        id="proofOfWork"
                                        name="proofOfWork"
                                        className='hidden'
                                        type="file"
                                        placeholder='Choose File'
                                        // ref={fileInputRef}
                                        style={{ backgroundColor: "white", borderRadius: "2rem" }}
                                    />
                                </Flex>
                            </FormControl>
                        </ModalBody>
                        <ModalFooter>
                            <Button colorScheme='blue' type="submit">
                                Save
                            </Button>
                        </ModalFooter>
                    </form>
                </ModalContent>
            </Modal> 
        </>

    )
}

export default PortfolioCard
