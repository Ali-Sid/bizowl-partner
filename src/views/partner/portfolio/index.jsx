import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Icon,
  Img,
  Input,
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  Text,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import { SearchBar } from "components/navbar/searchBar/SearchBar";
import React, { useEffect, useRef, useState } from "react";
import { FaPlus } from "react-icons/fa";
import PortfolioCard from "./components/PortfolioCard";
import { ModalBody } from "react-bootstrap";
import { GoPaperclip } from "react-icons/go";
import {
  serviceOptions,
  budgetOption,
  industryOption,
  subCategoryServicesData,
} from "utils/constant";
import { useFormik } from "formik";
import * as yup from "yup";
import {
  addDoc,
  collection,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { db } from "config/firebase";
import UploadImage from "./assets/Image-upload 1.png";
import { useDropzone } from "react-dropzone";
import { getRealTimeDocuments } from "services/SharedService";

const validatePortfolioSchema = yup.object().shape({
  clientName: yup.string().required("Client Name is Required"),
  projectName: yup.string().required("Project Name is Required"),
  description: yup.string().required("Description is Required"),
  budget: yup.string().required("Budget is Required"),
  service: yup.string().required("Service is  Required"),
  subCategoryService: yup.string().required("Service is  Required"),
  industry: yup.string().required("Industry is Required"),
});
const Portfolio = () => {
  const [addPortfolioModalOpen, setAddPortfolioModalOpen] = useState(false);
  const [portfolioData, setPortfolioData] = useState([]);
  const fileInputRef = useRef(null);
  const [unSubscribe, setUnSubscribe] = useState(null);
  const [droppedFile, setDroppedFile] = useState("");

  const onDrop = (files) => {
    setDroppedFile(files);
  };
  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  const handleSelect = () => {
    fileInputRef.current.click();
  };

  useEffect(() => {
    getPortfolio();
    return () => {
      if (unSubscribe) {
        unSubscribe();
      }
    };
  }, []);

  const addPortfolio = async (values, actions) => {
    try {
      const partnerUid = sessionStorage.getItem("uid");
      const portfolioDocRef = collection(db, "portfolio");
      const data = await addDoc(portfolioDocRef, {
        partner: partnerUid,
        ...values,
      });
      if (data) {
        setAddPortfolioModalOpen(false);
        actions.resetForm();
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const getPortfolio = async () => {
    try {
      const partnerUid = sessionStorage.getItem("uid");
      const queryForGetPortfolio = query(
        collection(db, "portfolio"),
        where("partner", "==", partnerUid)
      );
      const subScribe = onSnapshot(queryForGetPortfolio, (snapshot) => {
        const portfolios = snapshot.docs.map((doc, index) => {
          return {
            ...doc.data(),
            srNo: index + 1,
            id: doc.id,
          };
        });
        setPortfolioData(portfolios);
      });
      setUnSubscribe(() => subScribe);
    } catch (error) {
      console.log(error.message);
    }
  };

  const formik = useFormik({
    initialValues: {
      clientName: "",
      projectName: "",
      description: "",
      budget: "",
      endDate: "",
      service: "",
      subCategoryService: "",
      proofOfWork: [],
    },
    validationSchema: validatePortfolioSchema,
    onSubmit: addPortfolio,
  });

  return (
    <>
      <Flex justifyContent="space-between">
        <SearchBar background={"#D7E9FD"} placeholder={"Search Portfolio"} />
        <Flex
          pl="1rem"
          pr="1rem"
          color="#FFFFFF"
          backgroundColor="#407BFF"
          borderRadius="2rem"
          alignItems="center"
          cursor="pointer"
          onClick={() => {
            setAddPortfolioModalOpen(!addPortfolioModalOpen);
          }}
        >
          <Icon as={FaPlus} />
          <Text>Add Portfolio</Text>
        </Flex>
      </Flex>
      <Flex mt="2rem" flexWrap="wrap">
        {portfolioData?.map((data, index) => {
          return <PortfolioCard key={index} portfolio={data} />;
        })}
      </Flex>

      {/* Add Portfolio Modal */}
      <Modal
        isOpen={addPortfolioModalOpen}
        onClose={() => {
          setAddPortfolioModalOpen(!addPortfolioModalOpen);
          formik.handleReset();
        }}
      >
        <ModalOverlay />
        <ModalContent backgroundColor="#EBF2FA">
          <ModalHeader>Add Portfolio</ModalHeader>
          <ModalCloseButton />
          <form onSubmit={formik.handleSubmit}>
            <ModalBody style={{ marginLeft: "1rem", marginRight: "1rem" }}>
              <Text mb="1rem">Details</Text>
              <FormControl w="100%%" mb="4">
                <Text mb="2">Project Name</Text>
                <Input
                  id="projectName"
                  style={{ backgroundColor: "white" }}
                  name="projectName"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.projectName}
                />
              </FormControl>
              <FormControl w="100%%" mb="4">
                <Text mb="2">Client Name</Text>
                <Input
                  id="clientName"
                  style={{ backgroundColor: "white" }}
                  name="clientName"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.clientName}
                />
              </FormControl>
              <FormControl w="100%%" mb="4">
                <Text mb="2">Description</Text>
                <Textarea
                  id="description"
                  //minH="5rem"
                  style={{ backgroundColor: "white" }}
                  name="description"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.description}
                />
              </FormControl>
              <FormControl w="100%%" mb="4">
                <Text mb="2">Complete Date</Text>
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
                <Text mb="2">Service</Text>
                <Select
                  mb="4"
                  placeholder="Select Service"
                  name="service"
                  backgroundColor="white"
                  value={formik.values.service}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                >
                  {serviceOptions?.map((item, index) => {
                    return (
                      <option
                        value={item.value}
                        key={index}
                        fontSize="sm"
                        fontWeight="500"
                      >
                        {item.label}
                      </option>
                    );
                  })}
                </Select>
              </FormControl>
              {subCategoryServicesData?.filter(
                (service) => formik.values?.service in service
              ).length > 0 && (
                <FormControl>
                  <Text mb="2">Service Subcategory</Text>
                  <Select
                    mb="4"
                    placeholder="Select Service Category"
                    backgroundColor="white"
                    name="subCategoryService"
                    value={formik.values.subCategoryService}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  >
                    {subCategoryServicesData
                      .filter((service) => formik?.values?.service in service)
                      .map((option, index) => option[formik?.values?.service])
                      .flat()
                      .map((category, index) => (
                        <option key={index} value={category?.value}>
                          {category?.label}
                        </option>
                      ))}
                  </Select>
                </FormControl>
              )}

              <FormControl>
                <Text mb="2">Budget</Text>
                <Select
                  mb="4"
                  placeholder="Select Budget"
                  backgroundColor="white"
                  name="budget"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.budget}
                >
                  {budgetOption?.map((item, index) => {
                    return (
                      <option
                        value={item.value}
                        key={index}
                        fontSize="sm"
                        fontWeight="500"
                      >
                        {item.label}
                      </option>
                    );
                  })}
                </Select>
              </FormControl>

              <FormControl>
                <Text mb="2">Industry</Text>
                <Select
                  mb="4"
                  placeholder="Select Industry"
                  backgroundColor="white"
                  name="industry"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.industry}
                >
                  {industryOption?.map((item, index) => {
                    return (
                      <option
                        value={item.value}
                        key={index}
                        fontSize="sm"
                        fontWeight="500"
                      >
                        {item.label}
                      </option>
                    );
                  })}
                </Select>
              </FormControl>
              <FormControl w="45%">
                <FormLabel htmlFor="proofOfWork">Proof Of Work</FormLabel>
                <Flex alignItems="center">
                  <Icon color="#1C6ED0" as={GoPaperclip} />
                  <Input
                    size="sm"
                    width="auto"
                    id="proofOfWork"
                    name="proofOfWork"
                    className="hidden"
                    type="file"
                    placeholder="Choose File"
                    ref={fileInputRef}
                    style={{ backgroundColor: "white", borderRadius: "2rem" }}
                  />
                </Flex>
              </FormControl>
              <FormControl>
                <FormLabel>Upload Your File</FormLabel>
                <Flex
                  h="max-content"
                  border="1px solid"
                  borderColor="#455A6480"
                  alignContent="center"
                  justifyContent="center"
                  backgroundColor="#F7FCFB"
                  borderRadius="1rem"
                  cursor="pointer"
                  {...getRootProps({ className: "dropzone" })}
                >
                  <Img src={UploadImage} alt="Upload Image" h="10rem" />
                  <Input variant="main" {...getInputProps()} />
                </Flex>
              </FormControl>
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="blue" type="submit">
                Save
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
};

export default Portfolio;
