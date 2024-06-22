import { Box, Button, Flex, FormControl, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Select, Table, TableContainer, Tbody, Td, Text, Tfoot, Th, Thead, Tr, useDisclosure, useToast } from '@chakra-ui/react'
import React, { useEffect, useRef, useState } from 'react';
import { subCategoryServicesData } from 'utils/constant';
import { serviceOptions } from 'utils/constant';
import { useFormik } from 'formik'
import * as yup from 'yup';
import { addDoc, collection, onSnapshot, query, where } from 'firebase/firestore';
import { db } from 'config/firebase';

const validateServiceSchema = yup.object().shape({
  service: yup.string().required("Service is Required"),
  subCategoryService: yup.string().required("Service is  Required"),
  minPrice: yup.number(),
  maxPrice: yup.number()
})
const serviceTableColumn= ["Service", "Sub Category", "Min Price", "Max Price"];

const Services = () => {

  const [serviceTableData, setServiceTableData] = useState([]);
  const [unSubscribe, setUnSubscribe] = useState(null)
  const { isOpen, onOpen, onClose } = useDisclosure()
  const finalRef = useRef();
  const toast=useToast()

  useEffect(() => {
    getPartnerService();
      return () => {
          if (unSubscribe) {
              unSubscribe();
          }
      };
  }, []);

  const addService = async (values, actions) => {
    try {
      const partnerUid = sessionStorage.getItem('uid')
      const portfolioDocRef = collection(db, "partnerService");
      const data=await addDoc(portfolioDocRef, {
        partner: partnerUid,
        ...values
      });
      if(data){
        onClose()
        actions.resetForm()
        toast({
          description: "Service Added Successfully",
          status: "success",
          position: 'top',
          duration: 1000,
          isClosable: true,
        });
      }
    } catch (error) {
      console.log(error.message)
    }
  }

  const getPartnerService = async () => {
    try {
        const partnerUid = sessionStorage.getItem('uid')
        const queryForGetService = query(collection(db, "partnerService"), where("partner", "==", partnerUid));
        const subScribe = onSnapshot(queryForGetService, (snapshot) => {
            const services = snapshot.docs.map((doc, index) => {
                console.log(doc)
                return ({
                    ...doc.data(),
                    srNo: index + 1,
                    id: doc.id,
                })
            });
            setServiceTableData(services);
        });
        setUnSubscribe(() => subScribe)
    } catch (error) {
        console.log(error.message)
    }
}

  const formik = useFormik({
    initialValues: {
      service: "",
      subCategoryService: "",
      minPrice: "",
      maxPrice: "",
    },
    validationSchema: validateServiceSchema,
    onSubmit: addService
  })

  return (
    <Box>
      <Flex justifyContent='flex-end' mb='3'>
        <Button
          colorScheme='blue'
          onClick={onOpen}
        >
          + Add Service
        </Button>
      </Flex>
      <TableContainer backgroundColor='white' borderRadius='2rem' h='20rem'>
        <Table size='sm'>
          <Thead h='10' backgroundColor='#D7E9FD'>
            <Tr>
              {serviceTableColumn?.map((item, index) => (
                <Th key={index} textAlign='center'>{item}</Th>
              ))}
            </Tr>
          </Thead>
          <Tbody>
            {serviceTableData.map((item, index) => (
              <Tr key={index}>
                <Td textAlign='center'>{item?.service}</Td>
                <Td textAlign='center'>{item?.subCategoryService}</Td>
                <Td textAlign='center'>{item?.maxPrice}</Td>
                <Td textAlign='center'>{item?.minPrice}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>

      {/* Add Service Modal */}
      <Modal finalFocusRef={finalRef} isOpen={isOpen} onClose={onClose} >
        <ModalOverlay />
        <ModalContent backgroundColor='#EBF2FA'>
          <ModalHeader>Add Service</ModalHeader>
          <ModalCloseButton />
          <form onSubmit={formik.handleSubmit}>
          <ModalBody>
              <Text mb='2'>Service</Text>
              <Select
                mb='4'
                placeholder='Select option'
                backgroundColor="white"
                value={formik.values.service}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                name="service"
              >
                {
                  serviceOptions.map((item, index) => {
                    return (
                      <option value={item.value} key={index}>{item?.label}</option>
                    )
                  })
                }
              </Select>
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
              <FormControl
                w="100%%"
                mb='4'
              >
                <FormLabel htmlFor='minPrice'>Min Price</FormLabel>
                <Input
                  id="minPrice"
                  style={{ backgroundColor: "white" }}
                  name="minPrice"
                  type="number"
                  value={formik.values.minPrice}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
              </FormControl>
              <FormControl
                mb='4'
                w="100%"
              >
                <FormLabel htmlFor='minPrice'>Max Price</FormLabel>
                <Input
                  id="maxPrice"
                  style={{ backgroundColor: "white" }}
                  name="maxPrice"
                  type="number"
                  value={formik.values.maxPrice}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
              </FormControl>
              <Text>Please Note : Min Price and Max Prices are optional to fill.</Text>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme='blue' type="submit">
              Save
            </Button>
          </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </Box>
  )
}

export default Services
