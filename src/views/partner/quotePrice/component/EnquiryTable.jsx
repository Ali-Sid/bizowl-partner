import { Avatar, Flex, Table, TableContainer, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react'
import React from 'react'

const EnquiryTable = ({ column, row }) => {
    return (
        <TableContainer>
            <Table>
                <Thead  backgroundColor="#D0E3F3">
                    <Tr>
                        {column.map((item, index) => {
                            return (
                                <Th key={index}>{item}</Th>
                            )
                        })}
                    </Tr>
                </Thead>
                <Tbody backgroundColor="#EBF2FA">
                    {row.map((item, index) => {
                        return (
                            <Tr key={index}>
                                <Td>{item?.detail}</Td>
                                <Td>{item?.date}</Td>
                                <Flex justifyContent="center" alignItems="center">
                                    <Avatar w="2rem" h="2rem" />
                                    <Td pl="1">{item?.cName}</Td>
                                </Flex>
                                <Td>{item?.budget}</Td>
                                <Td>{item?.banking}</Td>
                                <Td>{item?.timeline}</Td>
                                <Td>{item?.status}</Td>
                                <Td>{item?.delivery}</Td>
                            </Tr>
                        )
                    })}
                </Tbody>
            </Table>
        </TableContainer>
    )
}

export default EnquiryTable
