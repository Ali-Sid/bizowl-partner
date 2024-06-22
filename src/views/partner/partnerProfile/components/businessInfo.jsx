import { Box, Button, Flex, FormControl, FormErrorMessage, FormLabel, Input, RangeSlider, RangeSliderFilledTrack, RangeSliderThumb, RangeSliderTrack, Select, Text, useToast } from '@chakra-ui/react'
import { db } from 'config/firebase';
import { collection, doc, getDocs, query, updateDoc, where } from 'firebase/firestore';
import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react';
import * as yup from 'yup';

const BusinessInfoSchema = yup.object({
  businessName: yup.string().required("Business name Required."),
  gstNumber: yup.string().required("GST NumberRequired."),
  experience: yup.string().required("Experience Required."),
  numberOfEmployees: yup.number().required("Number Of Employees Required."),
  // budget: yup.string().required("Budget Required."),
  // commission: yup.number().min(10, "Rate must be between 10 and 50"),
})

const BusinessInfo = () => {

  const [partnerId,setPartnerId]=useState("")
  const toast = useToast();

  useEffect(()=>{
    getCurrentPartner()
  },[])

  const editPortfolio = async (values) => {
    try {
      const portfolioDocRef = doc(db, "partners", partnerId);
      await updateDoc(portfolioDocRef, {businessDetails:values});
      toast({
        description: "Business Information updated Successfully",
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
      businessName: "",
      gstNumber: "",
      experience: "",
      numberOfEmployees: "",
      budget: "",
      commission: "",
    },
    validationSchema: BusinessInfoSchema,
    onSubmit: editPortfolio
  })

  const getCurrentPartner = async () => {
    try {
      const partnerUid = sessionStorage.getItem('uid')
      const queryForGetPartner = query(collection(db, "partners"), where("uid", "==", partnerUid));
      const querySnapshot = await getDocs(queryForGetPartner);
      if (!querySnapshot.empty) {
        const partnerData = querySnapshot.docs[0]?.data();
        const documentId = querySnapshot.docs[0]?.id
        setPartnerId(documentId)
        if(partnerData && partnerData.businessDetails){
          formik.setValues(partnerData.businessDetails)
        }
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
          <FormControl w="45%" isInvalid={formik.errors?.businessName && formik.touched?.businessName}>
            <FormLabel htmlFor='businessName'>Business Name</FormLabel>
            <Input
              id="businessName"
              name="businessName"
              type="text"
              onChange={formik.handleChange}
              value={formik?.values?.businessName??""}
              onBlur={formik?.handleBlur}
              style={{ backgroundColor: "white" }}
            />
            <FormErrorMessage>{formik.errors?.businessName}</FormErrorMessage>
          </FormControl>
          <FormControl w="45%" isInvalid={formik.errors?.gstNumber && formik.touched?.gstNumber}>
            <FormLabel htmlFor='gstNumber'>GST Number</FormLabel>
            <Input
              id="gstNumber"
              name="gstNumber"
              type="text"
              onChange={formik.handleChange}
              value={formik.values?.gstNumber}
              onBlur={formik.handleBlur}
              style={{ backgroundColor: "white" }}
            />
            <FormErrorMessage>{formik?.errors?.gstNumber}</FormErrorMessage>
          </FormControl>
        </Flex>
        <Flex
          mb='5'
          justifyContent="space-between"
        >
          <FormControl w="45%">
            <FormLabel htmlFor='experience'>Experience (in Years)</FormLabel>
            <Input
              id="experience"
              name="experience"
              type='number'
              style={{ backgroundColor: "white" }}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values?.experience}
            />
          </FormControl>
          <FormControl w="45%">
            <FormLabel htmlFor='numberOfEmployees'>No. of Employees</FormLabel>
            <Input
              id="numberOfEmployees"
              name="numberOfEmployees"
              type="number"
              appearance={'none'}
              style={{ backgroundColor: "white" }}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values?.numberOfEmployees}
            />
          </FormControl>
        </Flex>
        <FormLabel htmlFor='budget' mb='2'>Are you comfortable working with low budget or ticket clients ( Startups Mainly ) ?</FormLabel>
        <Select
          mb='4'
          id="budget"
          name="budget"
          placeholder='Select option'
          backgroundColor="white"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values?.budget}
        >
          <option value='True'>Yes</option>
          <option value='False'>No</option>
        </Select>
        <FormLabel htmlFor='commission' mb='2'>What commission rate are you comfortable with disclosing for the work you receive through our platform?</FormLabel>
        <Flex>
          <Button mr='5' onClick={()=>{formik.setFieldValue("commission",10)}}>10%</Button>
          <Button  onClick={()=>{formik.setFieldValue("commission",50)}}>50%</Button>
        </Flex>
        <div ms='2rem' style={{margin:'1rem'}}>
        <input type="range" width="400px" className="form-range" min="10" max="50" id="commission" name="commission" value={formik.values.commission} onChange={formik.handleChange} onBlur={formik.handleBlur}/>
        </div>
        <Button
          mt='5'
          colorScheme='blue'
          type="submit"
        >
          Save
        </Button>
      </form>
    </Box>
  )
}

export default BusinessInfo
