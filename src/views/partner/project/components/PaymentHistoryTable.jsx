import React, { useEffect, useState } from 'react'
import { Box, Button, Flex, Icon, Img, Table, TableCaption, TableContainer, Tbody, Td, Text, Tfoot, Th, Thead, Tr } from '@chakra-ui/react'
import CardTimeline from "../assets/img/system-uicons_card-timeline.png";
import { ChevronDownIcon } from '@chakra-ui/icons'
import { MdChevronLeft, MdChevronRight } from 'react-icons/md';
import { Calendar } from 'react-calendar';
import { Months } from '../data/ProjectData';

const PaymentHistoryTable = ({ columnData, rowData }) => {

    const [openCalendar, setOpenCalendar] = useState(false);
    const [startDate, setStartDate] = useState("13 Apr 2024");
    const [endDate, setEndDate] = useState("20 Apr 2024");
    const [months, setMonths] = useState([]);
    const [numberOfDays, setNumberOfDays] = useState("15 Days");

    useEffect(() => {
        setMonths(Months);
    }, [])

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
            <Flex m="1rem 2rem" justifyContent="space-between">
                <Flex
                    alignItems="center"
                    fontWeight="bold"
                    fontSize="1.1rem"
                >
                    <Text>Payment History</Text>
                </Flex>
                <Flex
                    p="0.5rem"
                    borderRadius="3rem"
                    justifyContent="space-between"
                    alignItems="center"
                    backgroundColor="#AACAEC80"
                >
                    <Img src={CardTimeline} alt="CardTimeline" style={{ width: "30px", height: "30px", marginRight: "0.6rem" }} />
                    <Text mr="0.6rem">Past {numberOfDays}</Text>
                    <Flex position="relative">
                        <ChevronDownIcon mr="0.6rem" fontSize="2rem" onClick={() => setOpenCalendar(!openCalendar)} cursor="pointer" />
                        {openCalendar &&
                            <Box
                                position="absolute"
                                top="42px"
                                left="-113px"
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

            <TableContainer border="3px solid" borderRadius="0.5rem" borderColor="#D3D3D3">
                <Table variant='simple'>
                    <Thead>
                        <Tr backgroundColor="#D0E3F3">
                            {columnData?.map((item, index) => (
                                <Th key={index}>{item}</Th>
                            ))}
                        </Tr>
                    </Thead>
                    <Tbody>
                        {rowData.map((item, index) => (
                            <Tr key={index}>
                                <Td>{item?.projectName}</Td>
                                <Td>{item?.date}</Td>
                                <Td>{item?.invoice}</Td>
                                <Td>{item?.amount}</Td>
                                <Td>{item?.tds}</Td>
                                <Td>{item?.commission}</Td>
                                <Td>{item?.final}</Td>
                                <Td>{item?.status}</Td>
                            </Tr>
                        ))}

                    </Tbody>
                </Table>
            </TableContainer>
            <Box></Box>
        </>
    )
}

export default PaymentHistoryTable
