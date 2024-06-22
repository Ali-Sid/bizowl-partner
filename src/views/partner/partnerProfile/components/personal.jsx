import { Box, Button, Flex, FormControl, FormErrorMessage, FormLabel, Input, Select,useToast } from '@chakra-ui/react'
import { db } from 'config/firebase';
import { collection, doc, getDocs, query, updateDoc, where } from 'firebase/firestore';
import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react';
import { States } from "views/partner/partnerProfile/data/ServiceData";
import * as yup from 'yup';

const personalDetailsSchema = yup.object({
    firstName: yup.string().required("First Name Required."),
    lastName: yup.string().required("Last Name Required."),
    city: yup.string().required("City Required."),
    state: yup.string().required("State Required."),
    email:yup.string().email().required("Phone is Required"),
    phone:yup.number().required("Phone is Required")
})

const Personal = () => {

    const [states, setStates] = useState([]);
    const [partnerDetails,setPartnerDetails]=useState({})
    const toast = useToast();
    useEffect(() => {
        getCurrentPartner()
        setStates(States);
    },[])

    const editPortfolio = async (values) => {
        try {
            const portfolioDocRef = doc(db, "partners", values?.id);
            await updateDoc(portfolioDocRef, values);
            toast({
                description: "Personal Information updated",
                status: "success",
                position: 'top',
                duration: 1500,
                isClosable: true,
              });
        } catch (error) {
            console.log(error.message)
        }
    }

    const formik = useFormik({
        initialValues: {
            id:'',
            firstName: '',
            middleName: '',
            lastName: '',
            city: '',
            state: '',
            email:'',
            whatsappNo:'',
            phone:''
        },
        validationSchema: personalDetailsSchema,
        onSubmit:editPortfolio
    })

    const getCurrentPartner = async () => {
        try {
            const partnerUid = sessionStorage.getItem('uid')
            const queryForGetPartner = query(collection(db, "partners"), where("uid", "==", partnerUid));
            const querySnapshot = await getDocs(queryForGetPartner);
            if (!querySnapshot.empty) {
                const partnerData = querySnapshot.docs[0]?.data();
                const documentId=querySnapshot.docs[0]?.id
                setPartnerDetails (partnerData);
                formik.setValues({id:documentId,...partnerData})
            } 
        }
        catch (error) {
            console.log(error.message)
        }
    }
    return (
        <Box w="100%" borderWidth='1px' borderRadius='lg' overflow='hidden' padding="2rem">
            <form onSubmit={formik.handleSubmit}>
                <Flex
                    mb='5'
                    justifyContent="space-between"
                >
                    <FormControl w="45%" isInvalid={formik?.errors?.firstName && formik?.touched?.firstName}>
                        <FormLabel htmlFor='firstName'>First Name</FormLabel>
                        <Input
                            id="firstName"
                            name="firstName"
                            type="text"
                            onChange={formik?.handleChange}
                            value={formik?.values?.firstName}
                            onBlur={formik?.handleBlur}
                            style={{ backgroundColor: "white" }}
                        />
                        <FormErrorMessage>{formik?.errors?.firstName}</FormErrorMessage>
                    </FormControl>
                    <FormControl w="45%" isInvalid={formik?.errors?.middleName && formik?.touched?.middleName}>
                        <FormLabel htmlFor='middleName'>Middle Name</FormLabel>
                        <Input
                            id="middleName"
                            name="middleName"
                            type="text"
                            onChange={formik?.handleChange}
                            value={formik?.values?.middleName}
                            onBlur={formik?.handleBlur}
                            style={{ backgroundColor: "white" }}
                        />
                        <FormErrorMessage>{formik?.errors?.middleName}</FormErrorMessage>
                    </FormControl>
                </Flex>
                <Flex
                    mb='5'
                    justifyContent="space-between"
                >
                    <FormControl w="45%" isInvalid={formik?.errors?.lastName && formik?.touched?.lastName}>
                        <FormLabel htmlFor='lastName'>Last Name</FormLabel>
                        <Input
                            id="lastName"
                            name="lastName"
                            type="text"
                            onChange={formik?.handleChange}
                            value={formik?.values?.lastName}
                            onBlur={formik?.handleBlur}
                            style={{ backgroundColor: "white" }}
                        />
                        <FormErrorMessage>{formik?.errors?.lastName}</FormErrorMessage>
                    </FormControl>
                    <FormControl w="45%" isInvalid={formik?.errors?.email && formik?.touched?.email}>
                        <FormLabel htmlFor='email'>Email Address</FormLabel>
                        <Input
                            id="email"
                            name="email"
                            type="text"
                            onChange={formik?.handleChange}
                            value={formik?.values?.email}
                            onBlur={formik?.handleBlur}
                            style={{ backgroundColor: "white" }}
                        />
                        <FormErrorMessage>{formik?.errors?.email}</FormErrorMessage>
                    </FormControl>
                </Flex>
                <Flex
                    mb='5'
                    justifyContent="space-between"
                >
                    <FormControl w="45%" isInvalid={formik?.errors?.phone && formik?.touched?.phone}>
                        <FormLabel htmlFor='phone'>Contact Number</FormLabel>
                        <Input
                            id="phone"
                            name="phone"
                            type="text"
                            onChange={formik?.handleChange}
                            value={formik?.values?.phone}
                            onBlur={formik?.handleBlur}
                            style={{ backgroundColor: "white" }}
                        />
                        <FormErrorMessage>{formik?.errors?.phone}</FormErrorMessage>
                    </FormControl>
                    <FormControl w="45%" isInvalid={formik?.errors?.whatsappNo && formik?.touched?.whatsappNo}>
                        <FormLabel htmlFor='whatsappNo'>Whatsapp Number</FormLabel>
                        <Input
                            id="whatsappNo"
                            name="whatsappNo"
                            type="number"
                            onChange={formik?.handleChange}
                            value={formik?.values?.whatsappNo}
                            onBlur={formik?.handleBlur}
                            style={{ backgroundColor: "white" }}
                        />
                        <FormErrorMessage>{formik?.errors?.whatsappNo}</FormErrorMessage>
                    </FormControl>
                </Flex>
                <Flex
                    mb='5'
                    justifyContent="space-between"
                >
                      <FormControl w="45%" isInvalid={formik?.errors?.city && formik?.touched?.city}>
                        <FormLabel htmlFor='city'>City</FormLabel>
                        <Input
                            id="city"
                            name="city"
                            type="text"
                            onChange={formik?.handleChange}
                            value={formik?.values?.city}
                            onBlur={formik?.handleBlur}
                            style={{ backgroundColor: "white" }}
                        />
                        <FormErrorMessage>{formik?.errors?.city}</FormErrorMessage>
                    </FormControl>
                    <FormControl w="45%" isInvalid={formik?.errors?.state && formik?.touched?.state}>
                        <FormLabel htmlFor='state'>State</FormLabel>
                        <Select
                            mb='4'
                            id='state'
                            name='state'
                            placeholder='Select option'
                            onChange={formik?.handleChange}
                            value={formik?.values?.state}
                            onBlur={formik?.handleBlur}
                            backgroundColor="white"
                        >
                            {states?.map((item, index) => (
                                <option value={item} key={index}>{item}</option>
                            ))}
                        </Select>
                        <FormErrorMessage>{formik?.errors?.state}</FormErrorMessage>
                    </FormControl>
                </Flex>
                <Button
                    colorScheme='blue'
                    type="submit"
                >
                    Save
                </Button>
            </form>
        </Box>
    )
}

export default Personal
