// assets
import CardTimeline from "./assets/img/system-uicons_card-timeline.png";

import { Avatar, Box, Button, Flex, Icon, Img, Link, Progress, Select, Tab, TabList, TabPanel, TabPanels, Tabs, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
// import { columnsDataComplex } from "../dataTables/variables/columnsData";
import ComplexTable from "./components/ComplexTable";
import tableDataComplex from "../../admin/default/variables/tableDataComplex.json"
import { ChevronDownIcon } from "@chakra-ui/icons";
import { Cards } from "./data/ProjectData";
import CustomCard from "./components/CustomCard";
import { HSeparator } from "components/separator/Separator";
import AvatarImg from "views/partner/project/assets/img/avatar1.png"
import ProjectCard from "./components/ProjectCard";
import { OngoingProjects } from "./data/ProjectData";
import { ColumnData, RowData, EnquiryColumn, EnquiryRow, PaymentHistoryRow, PaymentHistoryColumn, Months } from "./data/ProjectData";
import EnquiryTable from "./components/EnquiryTable";
import PaymentHistoryTable from "./components/PaymentHistoryTable";
import MiniCalendar from "components/calendar/MiniCalendar";
import { Calendar } from "react-calendar";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";


const Project = () => {

    const [cards, setCards] = useState([]);
    const [ongoingProjects, setOngoingProjects] = useState([]);
    // const [columnData, setColumnData] = useState([]);
    // const [rowData, setRowData] = useState([]);
    const [enquiryColumnData, setEnquiryColumnData] = useState([]);
    const [paymentHistoryColumnData, setPaymentHistoryColumnData] = useState([]);
    const [paymentHistoryRowData, setPaymentHistoryRowData] = useState([]);
    const [openCalendar, setOpenCalendar] = useState(false);
    const [startDate, setStartDate] = useState("13 Apr 2024");
    const [endDate, setEndDate] = useState("20 Apr 2024");
    const [numberOfDays, setNumberOfDays] = useState("15 Days");
    const [months, setMonths] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6;
    const totalPages = Math.ceil(ongoingProjects.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const displayData = ongoingProjects.slice(startIndex, endIndex);

    const handlePrev = () => {
        return (
            setCurrentPage((currPage) => Math.max(currPage - 1, 1))
        )
    }
    const handleNext = () => {
        return (
            setCurrentPage((currPage) => Math.min(currPage + 1, totalPages))
        )
    }

    useEffect(() => {
        setCards(Cards);
        setOngoingProjects(OngoingProjects);
        // setColumnData(ColumnData);
        // setRowData(RowData);
        setEnquiryColumnData(EnquiryColumn);
        setPaymentHistoryColumnData(PaymentHistoryColumn);
        setPaymentHistoryRowData(PaymentHistoryRow);
        setMonths(Months);
    })

    const handleDateRange = (dateRange) => {
        if (dateRange.length > 0) {
            setStartDate(`${dateRange[0].getDate()} ${months[dateRange[0].getMonth() + 1]} ${dateRange[0].getFullYear()}`);
            setEndDate(`${dateRange[1].getDate()} ${months[dateRange[1].getMonth() + 1]} ${dateRange[1].getFullYear()}`);
            const diffRange = Math.ceil((dateRange[1].getTime() - dateRange[0].getTime()) / (1000 * 3600 * 24));
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
        setOpenCalendar(!openCalendar)
    }

    return (
        <>
            <Flex
                maxW="100%"
                justifyContent='space-between'
            >
                <Text fontWeight="bold" fontSize='25px'>Overview</Text>
                <Flex
                    w="15%"
                    borderRadius="2rem"
                    justifyContent="center"
                    alignItems="center"
                    backgroundColor="#1C6ED059"
                >
                    <Select
                        placeholder='Select option'
                        colorScheme="#1C6ED059"
                        border="none"
                        borderRadius="2rem"
                        cursor="pointer"
                        icon={<Icon as={ChevronDownIcon} backgroundColor="#D9D9D9" height="55%" borderRadius="2rem" fontSize="1.3rem"/>}
                        style={{ backgroundColor: "#D7E9FD", boxShadow: "0px 4px 4px 0px #00000040" }}
                    >
                        <option value='7days'>Last 7 days</option>
                        <option value='1month'>Last month</option>
                        <option value='1year'>Last year</option>
                    </Select>
                </Flex>
            </Flex>
            <Flex
                mt="2rem"
                flexWrap="wrap"
                justifyContent="space-between"
            >
                {cards.map((item, index) => (
                    <CustomCard key={index} card={item} />
                ))}
            </Flex>
            <Flex
                mb="2rem"
                position="relative"
            >
                <Tabs>
                    <TabList>
                        <Tab>Ongoing Projects</Tab>
                        <Tab>Completed Projects</Tab>
                    </TabList>
                    <TabPanels>
                        <TabPanel>
                            <Flex
                                mt="2rem"
                                flexWrap="wrap"
                                justifyContent="space-between"
                            >
                                {displayData.map((item, index) => (
                                    <ProjectCard key={index} props={item} />
                                ))}
                            </Flex>
                            <Flex
                                justifyContent="space-between"
                            >
                                <Button
                                    border="1px solid #000000"
                                    backgroundColor="#9BC5EF26"
                                    boxShadow="0px 4px 4px 0px #00000040"
                                    borderRadius="5px"
                                    onClick={handlePrev}
                                >
                                    Prev
                                </Button>
                                <Text>Page {currentPage} of {totalPages}</Text>
                                <Button
                                    border="1px solid #000000"
                                    backgroundColor="#9BC5EF26"
                                    boxShadow="0px 4px 4px 0px #00000040"
                                    borderRadius="5px"
                                    onClick={handleNext}
                                >
                                    Next
                                </Button>
                            </Flex>
                        </TabPanel>
                        <TabPanel>
                            <Flex
                                mt="2rem"
                                flexWrap="wrap"
                                justifyContent="space-between"
                            >
                                {displayData.map((item, index) => (
                                    <ProjectCard key={index} props={item} />
                                ))}
                            </Flex>
                            <Flex
                                justifyContent="space-between"
                            >
                                <Button
                                    border="1px solid #000000"
                                    backgroundColor="#9BC5EF26"
                                    boxShadow="0px 4px 4px 0px #00000040"
                                    borderRadius="5px"
                                    onClick={handlePrev}
                                >
                                    Prev
                                </Button>
                                <Text>Page {currentPage} of {totalPages}</Text>
                                <Button
                                    border="1px solid #000000"
                                    backgroundColor="#9BC5EF26"
                                    boxShadow="0px 4px 4px 0px #00000040"
                                    borderRadius="5px"
                                    onClick={handleNext}
                                >
                                    Next
                                </Button>
                            </Flex>
                        </TabPanel>
                    </TabPanels>
                </Tabs>

                <Flex
                    position="absolute"
                    transform="translate(0%, 10px)"
                    right="0"
                    justifyContent="space-between"
                    alignItems="center"
                >
                    <Img src={CardTimeline} alt="CardTimeline" style={{ width: "30px", height: "30px", marginRight: "0.6rem" }} />
                    <Text mr="0.6rem">Past {numberOfDays}</Text>
                    <Flex>
                        <ChevronDownIcon mr="0.6rem" fontSize="2rem" onClick={() => setOpenCalendar(!openCalendar)} cursor="pointer" />
                        {openCalendar &&
                            <Box
                                position="absolute"
                                top="33px"
                                left="21px"
                                style={{ backgroundColor: "white" }}
                            >
                                <Calendar
                                    selectRange={true}
                                    onChange={handleDateRange}
                                    view={"month"}
                                    tileContent={<Text color='brand.500'></Text>}
                                    prevLabel={<Icon as={MdChevronLeft} w='24px' h='24px' mt='4px' />}
                                    nextLabel={<Icon as={MdChevronRight} w='24px' h='24px' mt='4px' />}
                                />
                            </Box>
                        }
                    </Flex>
                    <Text mr="0.6rem" >{startDate}</Text>
                    <Text><span style={{ marginRight: "0.6rem", fontSize: "0.8rem" }}>To</span>{endDate}</Text>
                </Flex>
            </Flex>
            {/* <Flex
                mb="2rem"
                position="relative"
                style={{
                    border: "3px solid",
                    borderRadius: "0.5rem",
                    borderColor: "#D3D3D3",
                }}
            >
                <Tabs>
                    <TabList>
                        <Tab>New Enquiries</Tab>
                        <Tab>Pending</Tab>
                        <Tab>Rejected Enquiries</Tab>
                    </TabList>
                    <TabPanels>
                        <TabPanel>
                            <EnquiryTable
                                columnData={enquiryColumnData}
                            />
                        </TabPanel>
                        <TabPanel>
                            <EnquiryTable
                                columnData={enquiryColumnData}
                            />
                        </TabPanel>
                        <TabPanel>
                            <EnquiryTable
                                columnData={enquiryColumnData}
                            />
                        </TabPanel>
                    </TabPanels>
                </Tabs>
                <Flex
                    position="absolute"
                    transform="translate(0%, 10px)"
                    right="0"
                    justifyContent="space-between"
                    alignItems="center"
                >
                    <Img
                        src={CardTimeline}
                        alt="CardTimeline"
                        style={{ width: "30px", height: "30px", marginRight: "0.6rem" }}
                    />
                    <Text mr="0.6rem">Past {numberOfDays}</Text>
                    <Flex position="relative">
                        <ChevronDownIcon mr="0.6rem" fontSize="2rem" onClick={() => setOpenCalendar(!openCalendar)} cursor="pointer" />
                        {openCalendar &&
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
                                    tileContent={<Text color='brand.500'></Text>}
                                    prevLabel={<Icon as={MdChevronLeft} w='24px' h='24px' mt='4px' />}
                                    nextLabel={<Icon as={MdChevronRight} w='24px' h='24px' mt='4px' />}
                                />
                            </Box>
                        }
                    </Flex>
                    <Text mr="0.6rem">{startDate}</Text>
                    <Text>
                        <span style={{ marginRight: "0.6rem", fontSize: "0.8rem" }}>To</span>
                        {endDate}
                    </Text>
                </Flex>
            </Flex> */}

            <EnquiryTable
                columnData={enquiryColumnData}
            />
            <Box mt="3rem">
                <PaymentHistoryTable
                    columnData={paymentHistoryColumnData}
                    rowData={paymentHistoryRowData}
                />
            </Box>
        </>

    );
};
export default Project;