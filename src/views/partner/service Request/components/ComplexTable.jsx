import {
    Flex,
    Table,
    Progress,
    Icon,
    Tbody,
    Td,
    Text,
    Th,
    Thead,
    Tr,
    useColorModeValue,
    useDisclosure,
    Button,
    Input,
    FormControl,
    FormLabel,
    Select,
} from "@chakra-ui/react";
import React, { useMemo, useState } from "react";
import {
    useGlobalFilter,
    usePagination,
    useSortBy,
    useTable,
} from "react-table";
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
} from '@chakra-ui/react'

// Custom components
import Card from "components/card/Card";
import Menu from "components/menu/MainMenu";
import { MdViewModule } from "react-icons/md";

// Assets
import { MdCheckCircle, MdCancel, MdOutlineError } from "react-icons/md";

export default function ColumnsTable(props) {

    const [moreDetails, setMoreDetails] = useState(false);
    const { columnsData, tableData } = props;
    const columns = useMemo(() => columnsData, [columnsData]);
    const data = useMemo(() => tableData, [tableData]);
    const [isOpen, setIsOpen] = useState(false);
    const [declineModal, setDeclineModal] = useState(false);
    const [budget, setBudget] = useState();
    const [timeline, setTimeline] = useState();
    const [bidAmount, setBidAmount] = useState("10 K");

    const handleModal = async (details) => {
        console.log(details)
        setIsOpen(true);
        setTimeline(details?.values?.timeLine);
        setBudget(details?.values?.budget);

    }
    const handleDeclineModal = () => {
        setIsOpen(!isOpen);
        setDeclineModal(!declineModal);
    }
    const tableInstance = useTable(
        {
            columns,
            data,
        },
        useGlobalFilter,
        useSortBy,
        usePagination
    );
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        page,
        prepareRow,
        initialState,
    } = tableInstance;
    initialState.pageSize = 5;
    const textColor = useColorModeValue("secondaryGray.900", "white");
    const borderColor = useColorModeValue("gray.200", "whiteAlpha.100");
    return (
        <Card
            direction='column'
            w='100%'
            px='0px'
            overflowX={{ sm: "scroll", lg: "hidden" }}>
            <Flex px='25px' justify='space-between' mb='10px' align='center'>
                <Text
                    color={textColor}
                    fontSize='22px'
                    fontWeight='700'
                    lineHeight='100%'>
                    Requested Project
                </Text>
            </Flex>
            <Table {...getTableProps()} variant='simple' color='gray.500' mb='24px'>
                <Thead>
                    {headerGroups.map((headerGroup, index) => (
                        <Tr {...headerGroup.getHeaderGroupProps()} key={index}>
                            {headerGroup.headers.map((column, index) => (
                                <Th
                                    {...column.getHeaderProps(column.getSortByToggleProps())}
                                    // pe='10px'
                                    key={index}
                                    borderColor={borderColor}>
                                    <Flex
                                        justify='center'
                                        align='center'
                                        fontSize={{ sm: "10px", lg: "12px" }}
                                        color='gray.400'>
                                        {column.render("Header")}
                                    </Flex>
                                </Th>
                            ))}
                        </Tr>
                    ))}
                </Thead>
                <Tbody {...getTableBodyProps()}>
                    {page.map((row, index) => {
                        prepareRow(row);
                        return (
                            <Tr {...row.getRowProps()} key={index}>
                                {row.cells.map((cell, index) => {
                                    let data = "";
                                    {/* if (cell.column.Header === "ACTION") {
                                        data = (
                                            <Flex align='center' justify="center">
                                                <Button size="sm" colorScheme="green" me="1" onClick={() => handleModal(row)}>
                                                    Approve
                                                </Button>
                                                <Button size="sm" colorScheme="red" me="1" onClick={() => handleDeclineModal()}>
                                                    Decline
                                                </Button>
                                            </Flex>
                                        );
                                    }
                                    else {
                                        data = (
                                            <Text color={textColor} fontSize='sm' fontWeight='700' align={"center"}>
                                                {cell.value}
                                            </Text>
                                        );
                                    } */}
                                    if (cell.column.Header === "CLIENT NAME") {
                                        data = (
                                            <Text color={textColor} fontSize='sm' fontWeight='700' align='center' justify="center">
                                                {cell.value}
                                            </Text>
                                        );
                                    } else if (cell.column.Header === "CLIENT EMAIL") {
                                        data = (
                                            <Text color={textColor} fontSize='sm' fontWeight='700' align='center' justify="center">
                                                {cell.value}
                                            </Text>
                                        );
                                    } else if (cell.column.Header === "BUDGET") {
                                        data = (
                                            <Text color={textColor} fontSize='sm' fontWeight='700' align='center' justify="center">
                                                {cell.value}
                                            </Text>
                                        );
                                    } else if (cell.column.Header === "PROGRESS") {
                                        data = (
                                            <Flex align='center' justify="center">
                                                <Progress
                                                    variant='table'
                                                    colorScheme='brandScheme'
                                                    h='8px'
                                                    w='108px'
                                                    value={cell.value}
                                                />
                                            </Flex>
                                        );
                                    } 
                                    return (
                                        <Td
                                            {...cell.getCellProps()}
                                            key={index}
                                            fontSize={{ sm: "14px" }}
                                            maxH='30px !important'
                                            py='8px'
                                            minW={{ sm: "150px", md: "200px", lg: "auto" }}
                                            borderColor='transparent'>
                                            {data}
                                        </Td>
                                    );
                                })}
                            </Tr>
                        );
                    })}
                </Tbody>
            </Table>
            <Modal
                isOpen={isOpen}
                onClose={() => { setIsOpen(false) }}
            >
                <ModalOverlay />
                {
                    !declineModal ? (
                        <ModalContent className="mt-2">
                            <ModalHeader>Product Details</ModalHeader>
                            <ModalBody>
                                <FormControl isRequired>
                                    <FormLabel>Timeline</FormLabel>
                                    <Input placeholder="Project Timeline" value={timeline} onChange={(e) => { setTimeline(e?.target?.value) }} />
                                </FormControl>
                                <FormControl isRequired style={{ marginTop: "1rem" }}>
                                    <FormLabel>Budget</FormLabel>
                                    <Input placeholder="Project Budget" value={budget} onChange={(e) => { setBudget(e?.target?.value) }} />
                                </FormControl>
                                <FormControl isRequired style={{ marginTop: "1rem" }}>
                                    <FormLabel>Bid Amount</FormLabel>
                                    <Input placeholder="Bid AMount" value={bidAmount} onChange={(e) => { setBidAmount(e?.target?.value) }} />
                                </FormControl>
                            </ModalBody>

                            <ModalFooter>
                                <Button colorScheme='blue' mr={3} onClick={() => { setIsOpen(false) }}>
                                    Done
                                </Button>
                                <Button colorScheme='red' mr={3} onClick={() => { setIsOpen(false) }}>
                                    Close
                                </Button>
                            </ModalFooter>
                        </ModalContent>
                    )
                        :
                        (<ModalContent className="mt-2">
                            <ModalHeader>Decline Modal</ModalHeader>
                            <ModalBody>
                                <FormControl isRequired>
                                    <FormLabel>Do you want to decline this project?</FormLabel>
                                    <Select placeholder='Select your decision'>
                                        <option value='yes'>Yes</option>
                                        <option value='no'>No</option>
                                    </Select>
                                </FormControl>
                                <FormControl isRequired style={{ marginTop: "1rem" }}>
                                    <FormLabel>Reason</FormLabel>
                                    <Input placeholder='Reason For Decline' />
                                </FormControl>
                            </ModalBody>
                            <ModalFooter>
                                <Button colorScheme='blue' mr={3} onClick={handleDeclineModal}>
                                    Confirm
                                </Button>
                                <Button colorScheme='red' mr={3} onClick={handleDeclineModal}>
                                    Cancel
                                </Button>
                            </ModalFooter>
                        </ModalContent>
                        )}
            </Modal>
        </Card>
    );
}
