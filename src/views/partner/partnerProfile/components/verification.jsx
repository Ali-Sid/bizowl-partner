import { Box, Button, Flex, FormControl, FormLabel, Input, InputGroup, InputLeftAddon, useToast, InputRightAddon, InputRightElement, Spinner } from '@chakra-ui/react'
import { db } from 'config/firebase';
import { storage } from 'config/firebase';
import { collection, doc, getDocs, query, updateDoc, where } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytes, uploadBytesResumable } from 'firebase/storage';
import { useFormik } from 'formik';
import React, { useEffect, useRef, useState } from 'react'
import { MdVisibility } from 'react-icons/md';

const Verification = () => {

  const aadhaarFileInputRef = useRef(null);
  const panFileInputRef = useRef(null);
  const companyDocumentFileInputRef = useRef(null);
  const [partnerId, setPartnerId] = useState("")
  const toast = useToast();
  const [isLoading, setIsLoading] = useState(true)
  useEffect(() => {
    getCurrentPartner()
  }, [])

  const editVerification = async (values) => {
    try {
      const portfolioDocRef = doc(db, "partners", partnerId);
      await updateDoc(portfolioDocRef, { verification: values });
      toast({
        description: "Documents updated Successfully",
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
      aadhaar: '',
      pan: '',
      companyDocument: ''
    },
    onSubmit: editVerification
  })

  const handleFileInputChange = async (event) => {
    if (event.target.files && event.target.files[0].name) {
      setIsLoading(true)
      const file = event.target.files[0];
      const fileName = file.name;
      const storageRef = ref(storage, `files/${fileName}`);
      try {
        await uploadBytes(storageRef, file);
        const downloadURL = await getDownloadURL(storageRef);
        formik.setFieldValue(event.target.name, downloadURL);
      } catch (error) {
        console.error('Upload error:', error);
      }
      finally {
        setIsLoading(false)
      }
    }
  };

  const getCurrentPartner = async () => {
    try {
      const partnerUid = sessionStorage.getItem('uid')
      const queryForGetPartner = query(collection(db, "partners"), where("uid", "==", partnerUid));
      const querySnapshot = await getDocs(queryForGetPartner);
      if (!querySnapshot.empty) {
        const partnerData = querySnapshot.docs[0]?.data();
        const documentId = querySnapshot.docs[0]?.id
        setPartnerId(documentId)
        if (partnerData && partnerData.verification) {
          formik.setValues(partnerData.verification)
        }
      }
    }
    catch (error) {
      console.log(error.message)
    }
    finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <Box w="100%" borderWidth='1px' borderRadius='lg' overflow='hidden' padding="2rem">
        {isLoading && (
          <Flex justifyContent={'center'}>
            <Spinner size="xl" marginTop={'5rem'} backdropBlur="blur" />
          </Flex>
        )}
        <form onSubmit={formik.handleSubmit}>
          <Flex
            mb='8'
            justifyContent="space-between"
          >

            <FormControl w="45%">
              <FormLabel htmlFor='aadhaar'>Aadhaar</FormLabel>
              <InputGroup>
                <InputLeftAddon
                  children='Upload'
                  onClick={() => aadhaarFileInputRef.current.click()}
                  style={{ cursor: "pointer" }}
                />

                <Input
                  name="aadhaar"
                  type="text"
                  placeholder='Browse File'
                  value={formik.values?.aadhaar}
                  readOnly={true}
                  onClick={() => aadhaarFileInputRef.current.click()}
                  style={{ cursor: "pointer", backgroundColor: "white", border: "1px solid #E2E8F0", borderRadius: "4px", padding: "0.5rem 1rem" }}
                />
                {formik.values.aadhaar && (
                  <InputRightAddon onClick={() => window.open(formik.values.aadhaar, '_blank')} style={{ cursor: 'pointer' }}>
                    <MdVisibility size={20} color='blue' />
                  </InputRightAddon>
                )}
                <Input
                  id="fileUpload"
                  name="aadhaar"
                  className='hidden'
                  type="file"
                  ref={aadhaarFileInputRef}
                  onChange={handleFileInputChange}
                  onClick={() => aadhaarFileInputRef.current.click()}
                  style={{ display: "none" }}
                />
              </InputGroup>
            </FormControl>
            <FormControl w="45%">
              <FormLabel htmlFor='pan'>Pan</FormLabel>
              <InputGroup>
                <InputLeftAddon
                  children='Upload'
                  onClick={() => panFileInputRef.current.click()}
                  style={{ cursor: "pointer" }}
                />
                <Input
                  name="pan"
                  type="text"
                  placeholder='Browse File'
                  value={formik.values?.pan}
                  readOnly={true}
                  onClick={() => panFileInputRef.current.click()}
                  style={{ cursor: "pointer", backgroundColor: "white", border: "1px solid #E2E8F0", borderRadius: "4px", padding: "0.5rem 1rem" }}
                />
                {formik.values.pan && (
                  <InputRightAddon onClick={() => window.open(formik.values.pan, '_blank')} style={{ cursor: 'pointer' }}>
                    <MdVisibility size={20} color='blue' />
                  </InputRightAddon>
                )}
                <Input
                  id="fileUpload"
                  name="pan"
                  className='hidden'
                  type="file"
                  ref={panFileInputRef}
                  onChange={handleFileInputChange}
                  onClick={() => panFileInputRef.current.click()}
                  style={{ display: "none" }}
                />
              </InputGroup>

            </FormControl>
          </Flex>
          <FormControl w="45%">
            <FormLabel htmlFor='companyDocument'>Company Document ( GST, CIN, MSME , Any )</FormLabel>
            <InputGroup>
              <InputLeftAddon
                children='Upload'
                onClick={() => companyDocumentFileInputRef.current.click()}
                style={{ cursor: "pointer" }}
              />
              <Input
                name="companyDocument"
                type="text"
                placeholder='Browse File'
                value={formik.values?.companyDocument}
                readOnly={true}
                onClick={() => companyDocumentFileInputRef.current.click()}
                style={{ cursor: "pointer", backgroundColor: "white", border: "1px solid #E2E8F0", borderRadius: "4px", padding: "0.5rem 1rem" }}
              />
              {formik.values.companyDocument && (
                <InputRightAddon onClick={() => window.open(formik.values.companyDocument, '_blank')} style={{ cursor: 'pointer' }}>
                  <MdVisibility size={20} color='blue' />
                </InputRightAddon>
              )}
              <Input
                id="fileUpload"
                name="companyDocument"
                className='hidden'
                type="file"
                ref={companyDocumentFileInputRef}
                onChange={handleFileInputChange}
                onClick={() => companyDocumentFileInputRef.current.click()}
                style={{ display: "none" }}
              />
            </InputGroup>

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
    </>
  )
}

export default Verification
