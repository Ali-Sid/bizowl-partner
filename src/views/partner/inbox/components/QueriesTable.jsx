import { Button, Flex, Table, TableContainer, Tbody, Td, Text, Th, Thead, Tr, filter } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { QueriesColumn, QueriesRow, SingleQueryRow, SingleQueryColumn } from "../data/InboxData";

const QueriesTable = () => {

    const [columnData, setColumnData] = useState([]);
    const [rowData, setRowData] = useState([]);
    const [queryStatus, setQueryStatus] = useState(true);
    const [singleQueryColumnData, setSingleQueryColumnData] = useState([]);
    const [singleQueryRowData, setSingleQueryRowData] = useState();
    const [queryId, setQueryId] = useState(1);

    useEffect(() => {
        setColumnData(QueriesColumn);
        setRowData(QueriesRow);
        setSingleQueryColumnData(SingleQueryColumn);
        setSingleQueryRowData(SingleQueryRow);
    }, [])

    const handleQueryStatus = (id) => {
        console.log("Id :", id);
        setQueryStatus(!queryStatus)
        setQueryId(id)
    }
    console.log("Query STatus :", queryStatus);
    return (
        <>
            {queryStatus ? (
                <TableContainer>
                    <Table
                        variant='simple'
                        overflowX="hidden"
                        style={{ borderCollapse: 'separate', borderSpacing: '0 1rem' }}
                    >
                        <Thead height="4rem" mb="1rem">
                            <Tr backgroundColor="#D0E3F3">
                                {columnData?.map((item, index) => (
                                    <Th key={index}>{item}</Th>
                                ))}
                            </Tr>
                        </Thead>
                        <Tbody>
                            {rowData.map((item, index) => (
                                <Tr key={index}
                                    backgroundColor="#EBF2FA"
                                    boxShadow="0rem 0.25rem 0.25rem 0rem #00000025"
                                >
                                    <Td>
                                        <Flex direction="column">
                                            <Text fontWeight="bold">{item?.category}</Text>
                                            <Text fontSize="sm">{item?.subCategory}</Text>
                                        </Flex>
                                    </Td>
                                    <Td>
                                        <Flex
                                            direction="column"
                                        >
                                            <Text fontWeight="bold">{item?.date}</Text>
                                            <Text fontSize="sm">{item?.time}</Text>
                                        </Flex>
                                    </Td>
                                    <Td>{item?.name}</Td>
                                    <Td fontWeight="bold">₹{item?.budget}</Td>
                                    <Td fontWeight="bold">{item?.industry}</Td>
                                    <Td fontWeight="bold">{item?.timeline}</Td>
                                    <Td fontWeight="bold">{item?.deliveryStatus}</Td>
                                    <Td cursor="pointer" onClick={() => { setQueryStatus(!queryStatus) }}>
                                        <Text color="#407BFF">Open</Text>
                                    </Td>
                                </Tr>
                            ))}

                        </Tbody>
                    </Table>
                </TableContainer>
            ) : (
                <TableContainer>
                    <Table
                        variant='simple'
                        overflowX="hidden"
                        style={{ borderCollapse: 'separate', borderSpacing: '0 1rem' }}
                    >
                        <Thead>
                            <Tr backgroundColor="#D0E3F3">
                                {singleQueryColumnData?.map((item, index) => (
                                    <Th key={index}>{item}</Th>
                                ))}
                            </Tr>
                        </Thead>
                        <Tbody>
                            {singleQueryRowData.filter(item => item.id === queryId).map((filterItem, index) => (
                                <Tr key={index}
                                    backgroundColor="#EBF2FA"
                                    boxShadow="0rem 0.25rem 0.25rem 0rem #00000025"
                                >
                                    <Td>
                                        <Flex direction="column">
                                            <Text fontWeight="bold">{filterItem?.category}</Text>
                                            <Text fontSize="sm">{filterItem?.subCategory}</Text>
                                        </Flex>
                                    </Td>
                                    <Td>
                                        <Flex
                                            direction="column"
                                        >
                                            <Text fontWeight="bold">{filterItem?.date}</Text>
                                            <Text fontSize="sm">{filterItem?.time}</Text>
                                        </Flex>
                                    </Td>
                                    <Td>{filterItem?.name}</Td>
                                    <Td fontWeight="bold">₹{filterItem?.budget}</Td>
                                    <Td fontWeight="bold">{filterItem?.industry}</Td>
                                    <Td fontWeight="bold">{filterItem?.timeline}</Td>
                                    <Td fontWeight="bold">{filterItem?.deliveryStatus}</Td>
                                    <Td fontWeight="bold">{filterItem?.leadStatus}</Td>
                                    <Td cursor="pointer" onClick={() => { setQueryStatus(!queryStatus) }}>
                                        <Text color="#407BFF">Open</Text>
                                    </Td>
                                </Tr>
                            ))}
                        </Tbody>
                    </Table>
                </TableContainer>
            )}
        </>
    )
}

export default QueriesTable
