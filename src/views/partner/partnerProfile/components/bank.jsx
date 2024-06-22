import React, { useEffect, useState } from 'react';
import { Box, Button, Flex, FormControl, FormLabel, Input, useToast } from '@chakra-ui/react'
import { useFormik } from 'formik';
import * as yup from 'yup';
import { collection, doc, getDocs, query, updateDoc, where } from 'firebase/firestore';
import { db } from 'config/firebase';

const Bank = () => {
  const [partnerId, setPartnerId] = useState("")
  const toast = useToast();

  useEffect(() => {
    getCurrentPartner()
  }, [])

  const editPortfolio = async (values) => {
    try {
      const portfolioDocRef = doc(db, "partners", partnerId);
      await updateDoc(portfolioDocRef, { bankDetails: values });
      toast({
        description: "Bank updated Successfully",
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
      accountNumber: "",
      branch: "",
      bank: "",
      ifscNumber: "",
      bankingName: "",
    },
    // validationSchema: BusinessInfoSchema,
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
        if(partnerData && partnerData.bankDetails){
          formik.setValues(partnerData.bankDetails)
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
          <FormControl w="45%">
            <FormLabel htmlFor='accountNumber'>Account Number</FormLabel>
            <Input
              id="accountNumber"
              name="accountNumber"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values?.accountNumber}
              style={{ backgroundColor: "white" }}
            />
          </FormControl>
          <FormControl w="45%">
            <FormLabel htmlFor='branch'>Branch Name</FormLabel>
            <Input
              id="branch"
              name="branch"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values?.branch}
              style={{ backgroundColor: "white" }}
            />
          </FormControl>
        </Flex>
        <Flex
          mb='5'
          justifyContent="space-between"
        >
          <FormControl w="45%">
            <FormLabel htmlFor='bank'>Bank Name</FormLabel>
            <Input
              id="bank"
              name="bank"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values?.bank}
              style={{ backgroundColor: "white" }}
            />
          </FormControl>
          <FormControl w="45%">
            <FormLabel htmlFor='ifscNumber'>IFSC</FormLabel>
            <Input
              id="ifscNumber"
              name="ifscNumber"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values?.ifscNumber}
              style={{ backgroundColor: "white" }}
            />
          </FormControl>
        </Flex>
        <FormControl w="45%">
          <FormLabel htmlFor='bankingName'>Banking Name</FormLabel>
          <Input
            id="bankingName"
            name="bankingName"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values?.bankingName}
            style={{ backgroundColor: "white" }}
          />
        </FormControl>
        <Button
          mt='3'
          colorScheme='blue'
          type="submit"
        >
          Save
        </Button>
      </form>
    </Box>
  )
}

export default Bank
