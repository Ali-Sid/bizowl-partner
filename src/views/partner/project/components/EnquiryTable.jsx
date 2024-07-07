import { ChevronDownIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Img,
  ModalOverlay,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import CardTimeline from "../assets/img/system-uicons_card-timeline.png";
import {
  Avatar,
  Icon,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@chakra-ui/react";
import { BsClock } from "react-icons/bs";
import { FaRegCalendarAlt } from "react-icons/fa";
import { SlGraph } from "react-icons/sl";
import { GoBell } from "react-icons/go";
import { TbTag } from "react-icons/tb";
import { HSeparator } from "components/separator/Separator";
import { NavLink } from "react-router-dom/cjs/react-router-dom";
import {
  collection,
  query,
  where,
  onSnapshot,
  updateDoc,
  doc,
  getDocs,
} from "firebase/firestore";
import { db } from "config/firebase";
import { getClientDetails } from "services/ClientService";
import { updateDocument } from "services/SharedService";
import { serviceRequestStatus } from "utils/constant";
import { CustomerDecisionPriority, Months } from "../data/ProjectData";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import { Calendar } from "react-calendar";

const EnquiryTable = ({ columnData }) => {
  const [openActionModal, setOpenActionModal] = useState(false);
  const [unSubscribe, setUnSubscribe] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const itemsPerPage = 6;
  const [enquiryData, setEnquiryData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentEnquiry, setCurrentEnquiry] = useState({});
  const [openCalendar, setOpenCalendar] = useState(false);
  const [startDate, setStartDate] = useState("13 Apr 2024");
  const [endDate, setEndDate] = useState("20 Apr 2024");
  const [months, setMonths] = useState([]);
  const [numberOfDays, setNumberOfDays] = useState("15 Days");
  const partnerUid = sessionStorage.getItem("uid");
  const [formData, setFormData] = useState({
    question: "",
  });
  const [customerDecisionPriority, setCustomerDecisionPriority] = useState([]);
  const [displayDbData, setDisplayDbData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const querySnapshot = await getDocs(collection(db, "assignments"));
      const data = [];
      querySnapshot.forEach((doc) => {
        const assignmentData = doc.data();
        const rowData = assignmentData.rowData;
        const partners = assignmentData.partners;

        // Check if rowData and partners are objects
        if (typeof rowData === "object" && typeof partners === "object") {
          const rowDataArray = Object.values(rowData);
          const partnersArray = Object.values(partners);

          rowDataArray.forEach((row) => {
            partnersArray.forEach((partner) => {
              data.push({
                services: partner.services,
                subCategoryServices: partner.subCategoryServices,
                startDate: row.startDate,
                time: row.time,
                name: row.name,
                budget: row.budget,
                projectType: row.projectType,
                timeLine: row.timeLine,
                status: row.status,
                // Add more fields as needed
              });
            });
          });
        }
      });

      setDisplayDbData(data);
      console.log(displayDbData)
    };

    fetchData();
  }, []);

  useEffect(() => {
    getServiceRequests();
    setCustomerDecisionPriority(CustomerDecisionPriority);
    setMonths(Months);
    return () => {
      if (unSubscribe) {
        unSubscribe();
      }
    };
  }, []);

  const getServiceRequests = async () => {
    try {
      // const userQuery = query(collection(db, 'quotations'), where('notifiedPartners', 'array-contains', partnerUid));
      const userQuery = query(collection(db, "quotations"));
      const subScribe = onSnapshot(userQuery, (snapshot) => {
        const serviceRequests = snapshot.docs.map((doc, index) => {
          return {
            ...doc.data(),
            srNo: index + 1,
            id: doc.id,
            name: `${doc.data().userDetails?.firstName}  ${
              doc.data().userDetails?.lastName
            }`,
            email: doc.data().userDetails?.email,
            phone: doc.data().userDetails?.phone,
          };
        });
        setEnquiryData(serviceRequests);
      });
      setUnSubscribe(() => subScribe);
    } catch (error) {
      console.log(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const displayData = displayDbData.slice(startIndex, endIndex);
  const totalPages = Math.ceil(enquiryData.length / itemsPerPage);

  const handleNext = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  const handlePrev = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const viewEnquiryDetails = async (item) => {
    if (item?.userDetails?.uid) {
      const queryForGetClient = query(
        collection(db, "users"),
        where("uid", "==", item?.userDetails?.uid)
      );
      const client = await getDocs(queryForGetClient);
      if (!client.empty) {
        const clientData = client.docs[0]?.data();
        item = {
          ...item,
          userDetails: { ...item?.userDetails, profile: clientData?.profile },
        };
      }
    }
    setCurrentEnquiry(item);
    setOpenActionModal(true);
  };

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target?.value });
  };

  const sendResponse = async (id) => {
    const serviceRef = doc(db, "quotations", id);
    const partnerResponses = [
      ...currentEnquiry?.partnerResponses,
      {
        question: formData.question,
        partner: partnerUid,
        eStatus: serviceRequestStatus.Pending,
      },
    ];
    await updateDoc(serviceRef, {
      partnerResponses: partnerResponses,
    });
    setOpenActionModal(false);
  };

  const handleDateRange = (dateRange) => {
    if (dateRange.length > 0) {
      setStartDate(
        `${dateRange[0].getDate()} ${
          months[dateRange[0].getMonth() + 1]
        } ${dateRange[0].getFullYear()}`
      );
      setEndDate(
        `${dateRange[1].getDate()} ${
          months[dateRange[1].getMonth() + 1]
        } ${dateRange[1].getFullYear()}`
      );
      const diffRange = Math.ceil(
        (dateRange[1].getTime() - dateRange[0].getTime()) / (1000 * 3600 * 24)
      );
      if (diffRange >= 31) {
        const months = Math.floor(diffRange / 30);
        const days = diffRange % 30;
        if (months > 1 && days > 1) {
          setNumberOfDays(`${months} months ${days} days`);
        } else if (months > 1 && days == 1) {
          setNumberOfDays(`${months} months ${days} day`);
        } else if (months === 1 && days > 1) {
          setNumberOfDays(`${months} month ${days} days`);
        } else if (months === 1 && days === 1) {
          setNumberOfDays(`${months} month ${days} day`);
        }
      } else if (diffRange > 1) {
        setNumberOfDays(`${diffRange} days`);
      } else {
        setNumberOfDays(`${diffRange} day`);
      }
    }
    setOpenCalendar(!openCalendar);
  };

  return (
    <>
      <div
        style={{
          border: "3px solid",
          borderRadius: "0.5rem",
          borderColor: "#D3D3D3",
        }}
      >
        <Flex m="0.3rem 2rem" justifyContent="space-between">
          <Flex alignItems="center" fontWeight="bold" fontSize="1.1rem">
            <Text cursor="pointer">New Enquiries</Text>
            <Text cursor="pointer" ml="1rem">
              Pending
            </Text>
            <Text cursor="pointer" ml="1rem">
              Rejected Enquiries
            </Text>
          </Flex>
          <Flex justifyContent="flex-end" alignItems="center">
            <Img
              src={CardTimeline}
              alt="CardTimeline"
              style={{ width: "30px", height: "30px", marginRight: "0.6rem" }}
            />
            <Text mr="0.6rem">Past {numberOfDays}</Text>
            <Flex position="relative">
              <ChevronDownIcon
                mr="0.6rem"
                fontSize="2rem"
                onClick={() => setOpenCalendar(!openCalendar)}
                cursor="pointer"
              />
              {openCalendar && (
                <Box
                  position="absolute"
                  top="33px"
                  left="-116px"
                  style={{ backgroundColor: "white" }}
                >
                  <Calendar
                    selectRange={true}
                    onChange={handleDateRange}
                    view={"month"}
                    tileContent={<Text color="brand.500"></Text>}
                    prevLabel={
                      <Icon as={MdChevronLeft} w="24px" h="24px" mt="4px" />
                    }
                    nextLabel={
                      <Icon as={MdChevronRight} w="24px" h="24px" mt="4px" />
                    }
                  />
                </Box>
              )}
            </Flex>
            <Text mr="0.6rem">{startDate}</Text>
            <Text>
              <span style={{ marginRight: "0.6rem", fontSize: "0.8rem" }}>
                To
              </span>
              {endDate}
            </Text>
          </Flex>
        </Flex>
        <TableContainer>
          <Table
            variant="simple"
            style={{ borderCollapse: "separate", borderSpacing: "0 1rem" }}
          >
            <Thead height="4rem" mb="1rem">
              <Tr backgroundColor="#D0E3F3">
                {columnData?.map((item, index) => (
                  <Th key={index}>{item}</Th>
                ))}
              </Tr>
            </Thead>
            <Tbody>
              {displayData.map((item, index) => (
                <Tr
                  key={index}
                  backgroundColor="#EBF2FA"
                  boxShadow="0rem 0.25rem 0.25rem 0rem #00000040"
                >
                  <Td>
                    <Flex direction="column">
                      <Text fontWeight="bold">{item?.services}</Text>
                      <Text fontSize="sm">{item?.subCategoryServices}</Text>
                    </Flex>
                  </Td>
                  <Td>
                    <Flex direction="column">
                      <Text fontWeight="bold">{item?.startDate}</Text>
                      <Text fontSize="sm">{item?.time}</Text>
                    </Flex>
                  </Td>
                  <Td>{item?.name}</Td>
                  <Td fontWeight="bold">₹{item?.budget}</Td>
                  <Td fontWeight="bold">{item?.projectType}</Td>
                  <Td fontWeight="bold">{item?.timeLine}</Td>
                  <Td fontWeight="bold">{item?.status}</Td>
                  <Td>
                    <Button
                      backgroundColor="#9BC5EF"
                      borderRadius="2rem"
                      cursor="pointer"
                      onClick={() => viewEnquiryDetails(item)}
                    >
                      Action
                    </Button>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
        <Flex
          justifyContent="space-between"
          alignItems="center"
          m="1rem 2rem"
          position={"relative"}
        >
          <Button
            onClick={handlePrev}
            backgroundColor="#9BC5EF"
            border="1px solid #000000"
            borderRadius="5px"
          >
            Back
          </Button>
          <Text>
            Page {currentPage} of {totalPages}
          </Text>
          <Button
            onClick={handleNext}
            backgroundColor="#9BC5EF"
            border="1px solid #000000"
            borderRadius="5px"
          >
            Next
          </Button>
        </Flex>
      </div>

      {/* Action Modal Opening */}
      <Modal
        size="xl"
        isOpen={openActionModal}
        onClose={() => {
          setOpenActionModal(!openActionModal);
        }}
      >
        <ModalOverlay />
        <ModalContent backgroundColor="#EBF2FA">
          <ModalHeader>{currentEnquiry?.services}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>Details</Text>
            <Flex pt="1rem" pb="1rem">
              <Flex w="50%">
                <Avatar size="sm" src={currentEnquiry?.userDetails?.profile} />
                <Input
                  ml="0.5rem"
                  variant="flushed"
                  placeholder="CustomerName"
                  value={currentEnquiry?.userDetails?.firstName}
                  disabled={true}
                />
              </Flex>
              <Flex w="50%">
                <Input
                  ml="0.5rem"
                  variant="flushed"
                  placeholder="SEO"
                  value={currentEnquiry?.userDetails?.lastName}
                  disabled={true}
                />
              </Flex>
            </Flex>
            <Flex pt="1rem" pb="1rem">
              <Flex w="50%" alignItems="center">
                <Icon as={SlGraph} />
                <Input
                  ml="0.5rem"
                  variant="flushed"
                  placeholder="Banking & Finance"
                  value={currentEnquiry?.projectType}
                  disabled={true}
                />
              </Flex>
              <Flex w="50%" alignItems="center">
                <Icon as={FaRegCalendarAlt} />
                <Input
                  ml="0.5rem"
                  variant="flushed"
                  placeholder="24 Jan 2024 to 24 Feb 2024"
                  value={currentEnquiry?.startDate}
                  disabled={true}
                />
              </Flex>
            </Flex>
            <Text>Pricing</Text>
            <Flex pt="1rem" pb="1rem">
              <Flex w="50%" alignItems="center">
                <Icon as={BsClock} />
                <Input
                  ml="0.5rem"
                  variant="flushed"
                  placeholder="2 Weeks"
                  value={currentEnquiry?.timeLine}
                  disabled={true}
                />
              </Flex>
              <Flex w="50%" alignItems="center">
                <Icon as={GoBell} />
                <Input
                  ml="0.5rem"
                  variant="flushed"
                  placeholder="Immediately"
                />
              </Flex>
            </Flex>
            <Flex pt="1rem" pb="1rem" w="50%" alignItems="center">
              <Icon as={TbTag} />
              <Input
                variant="flushed"
                placeholder="Banking & Finance"
                value={currentEnquiry?.budget}
                disabled={true}
              />
            </Flex>
            <Text pt="0.8rem" pb="0.8rem">
              Project Requirement
            </Text>
            <HSeparator boxShadow="0px 0.25rem 0.25rem 0px rgba(0, 0, 0, 0.4)" />
            <Text mt="0.8rem" mb="0.8rem" fontSize="sm">
              {currentEnquiry?.requirements}
            </Text>
            <HSeparator boxShadow="0px 0.25rem 0.25rem 0px rgba(0, 0, 0, 0.4)" />
            <Text mt="1rem">Customer Decision Priority</Text>
            <Flex flexDirection="column">
              {customerDecisionPriority.map((item, index) => {
                return (
                  <Flex justifyContent="space-between" mt="1rem" index={index}>
                    <Box
                      as="button"
                      w="30%"
                      h="2.5rem"
                      mr="0.5rem"
                      textAlign="center"
                      backgroundColor={item[0].bgColor}
                      color={item[0].color}
                      _hover={{ bg: "#ebedf0", color: "#FFFFFF" }}
                      borderTopLeftRadius="1rem"
                      borderBottomLeftRadius="1rem"
                    >
                      {item[0].text}
                    </Box>
                    <Box
                      as="button"
                      w="30%"
                      h="2.5rem"
                      mr="0.5rem"
                      textAlign="center"
                      backgroundColor={item[1].bgColor}
                      color={item[1].color}
                      _hover={{ bg: "#ebedf0", color: "#FFFFFF" }}
                    >
                      {item[1].text}
                    </Box>
                    <Box
                      as="button"
                      w="30%"
                      h="2.5rem"
                      mr="0.5rem"
                      textAlign="center"
                      backgroundColor={item[2].bgColor}
                      color={item[2].color}
                      _hover={{ bg: "#ebedf0", color: "#FFFFFF" }}
                      borderTopRightRadius="1rem"
                      borderBottomRightRadius="1rem"
                    >
                      {item[2].text}
                    </Box>
                  </Flex>
                );
              })}
            </Flex>
            <Text mt="1rem" mb="1rem">
              Status
            </Text>
            <Flex justifyContent="space-between">
              <Box
                as="button"
                w="25%"
                h="2.5rem"
                mr="0.5rem"
                textAlign="center"
                backgroundColor="#D8F9E6"
                color="#5DEF92"
                _hover={{ bg: "#ebedf0", color: "#FFFFFF" }}
                borderTopLeftRadius="1rem"
                borderBottomLeftRadius="1rem"
              >
                New
              </Box>
              <Box
                as="button"
                w="25%"
                h="2.5rem"
                mr="0.5rem"
                textAlign="center"
                backgroundColor="#5DEF9233"
                color="#5DEF92"
                _hover={{ bg: "#ebedf0", color: "#FFFFFF" }}
              >
                Open
              </Box>
              <Box
                as="button"
                w="25%"
                h="2.5rem"
                mr="0.5rem"
                textAlign="center"
                backgroundColor="#65C756"
                color="#FFFFFF"
                _hover={{ bg: "#ebedf0", color: "#FFFFFF" }}
              >
                In Progress
              </Box>
              <Box
                as="button"
                w="25%"
                h="2.5rem"
                mr="0.5rem"
                textAlign="center"
                backgroundColor="#E0E0E0"
                color="#455A64BF"
                _hover={{ bg: "#ebedf0", color: "#FFFFFF" }}
                borderTopRightRadius="1rem"
                borderBottomRightRadius="1rem"
              >
                Closed
              </Box>
            </Flex>
          </ModalBody>
          <Text ml="1.5rem">Take Action</Text>
          <Flex
            ml="1.5rem"
            mt="1rem"
            mb="1rem"
            justifyContent="flex-start"
            color="#FFFFFF"
          >
            <NavLink to="/partner/quote">
              <Button backgroundColor="#407BFF">Quote Price</Button>
            </NavLink>
            <Button ml="1rem" backgroundColor="#F28F8F">
              Not Interested
            </Button>
          </Flex>
          <FormControl mt="1rem" mb="1rem" w="90%" ml="1.5rem">
            <FormLabel htmlFor="question">
              Have more Questions to ask before you bid?
            </FormLabel>
            <Input
              id="question"
              type="text"
              name="question"
              placeholder="Type your Question"
              minHeight="6rem"
              backgroundColor="#FFFFFF"
              value={formData?.question}
              onChange={handleChange}
            />
          </FormControl>
          <ModalFooter>
            <Button
              backgroundColor="#407BFF"
              color="#F5F5F5"
              onClick={() => sendResponse(currentEnquiry?.id)}
            >
              Send
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default EnquiryTable;
