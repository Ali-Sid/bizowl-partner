import { Avatar, Box, Button, Flex, FormControl, FormLabel, Input, Tab, TabList, TabPanel, TabPanels, Tabs, Text, Textarea } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { ColumnData } from './data/QuotePriceData';
import { RowData } from './data/QuotePriceData';
import EnquiryTable from './component/EnquiryTable';

const QuotePrice = () => {
    const [columnData, setColumnData] = useState([]);
    const [rowData, setRowData] = useState([]);

    useEffect(() => {
        setColumnData(ColumnData);
        setRowData(RowData);
    }, [])
    return (
        <>
            <Text ml="2.5rem" mb="1rem" fontSize="xl" fontWeight="bold">Enquiry</Text>
            <EnquiryTable
                column={columnData}
                row={rowData}
            />

            <Text m="1rem 0 1rem 2rem" fontSize="xl" fontWeight="bold">Quote Price</Text>
            <Flex>
                <Tabs variant='unstyle' w="100%">
                    <TabList>
                        <Tab ml="1rem" border="1px solid" borderRadius="1rem" borderColor="#76767e" bgColor="#FFFFFF">Basic Details</Tab>
                        <Tab ml="3rem" border="1px solid" borderRadius="1rem" borderColor="#76767e" bgColor="#FFFFFF">All Features</Tab>
                    </TabList>
                    <TabPanels >
                        <TabPanel>
                            <Box h="max-content" p="2rem" border="1px solid" borderRadius="0.5rem" borderColor="#D9D9D9" bgColor="inherit">
                                <Flex fontSize="sm" justifyContent="center" alignItems="center">
                                    <FormControl w="80%">
                                        <FormLabel htmlFor='price'>Price</FormLabel>
                                        <Input
                                            w="60%"
                                            id='price'
                                            type='number'
                                            placeholder='₹9999'
                                        />
                                    </FormControl>
                                    <FormControl ml="0.8rem" w="80%">
                                        <FormLabel htmlFor='timeline'>Timeline</FormLabel>
                                        <Input
                                            w="60%"
                                            id='timeline'
                                            type='text'
                                            placeholder='1 week'
                                        />
                                    </FormControl>
                                    <FormControl ml="0.8rem" w="80%">
                                        <FormLabel htmlFor='startDate'>Start Date</FormLabel>
                                        <Input
                                            // w="20%"
                                            id='startDate'
                                            type='date'
                                            placeholder='14 Feb 2024'
                                        />
                                    </FormControl>
                                    <FormControl ml="0.8rem" w="80%">
                                        <FormLabel htmlFor='revisions'>Revisions</FormLabel>
                                        <Input
                                            w="60%"
                                            id='revisions'
                                            type='number'
                                            placeholder='3'
                                        />
                                    </FormControl>
                                    <FormControl ml="0.8rem" w="100%">
                                        <FormLabel htmlFor='postServiceSupport'>Post Service Support</FormLabel>
                                        <Input
                                            w="60%"
                                            id='postServiceSupport'
                                            type='text'
                                            placeholder='Yes'
                                        />
                                    </FormControl>
                                </Flex>
                                <Flex mt="2rem" w="80%">
                                    <FormControl>
                                        <FormLabel htmlFor='paymentStructure'>Payment Structure</FormLabel>
                                        <Input
                                            w="60%"
                                            id='paymentStructure'
                                            type='number'
                                            placeholder='3'
                                        />
                                    </FormControl>
                                    <FormControl ml="1rem" display="flex" flexDirection="column" alignItems="center" justifyContent="center">
                                        <FormLabel htmlFor='paymentRatio'>Payment Ratio</FormLabel>
                                        <Flex justifyContent="center" alignItems="center">
                                            <Input
                                                id='paymentRatio'
                                                type='text'
                                                placeholder='50'
                                            />
                                            <Input
                                                ml="1rem"
                                                id='paymentRatio'
                                                type='text'
                                                placeholder='25'
                                            />
                                            <Input
                                                ml="1rem"
                                                id='paymentRatio'
                                                type='text'
                                                placeholder='25'
                                            />
                                        </Flex>
                                    </FormControl>
                                    <FormControl display="flex" flexDirection="column" alignItems="center" justifyContent="center">
                                        <FormLabel htmlFor='desiredCommission'>Desired Commission</FormLabel>
                                        <Flex>
                                            <Input
                                                ml="1rem"
                                                id='desiredCommission'
                                                type='text'
                                                placeholder='10%'
                                            />
                                            <Input
                                                ml="1rem"
                                                id='desiredCommission'
                                                type='text'
                                                placeholder='10%'
                                            />
                                        </Flex>
                                    </FormControl>
                                </Flex>
                                <FormControl mt="2rem">
                                    <FormLabel htmlFor='keyFeatures'>Key Features</FormLabel>
                                    <Text fontSize="sm">Please note : you can only write maximum 20 characters in each box.</Text>
                                    <Flex>
                                        <Input
                                            ml="1rem"
                                            id='keyFeatures'
                                            type='text'
                                            placeholder=''
                                        />
                                        <Input
                                            ml="1rem"
                                            id='keyFeatures'
                                            type='text'
                                            placeholder=''
                                        />
                                    </Flex>
                                    <Flex mt="1rem">
                                        <Input
                                            ml="1rem"
                                            id='keyFeatures'
                                            type='text'
                                            placeholder=''
                                        />
                                        <Input
                                            ml="1rem"
                                            id='keyFeatures'
                                            type='text'
                                            placeholder=''
                                        />
                                    </Flex>
                                </FormControl>
                                <Text mt="1rem">Best Practices</Text>
                                <Text w="40%" fontSize="0.5rem">
                                    Please give best payment options to our users, Your payment is always safe.
                                    Try to give exclusive price to our users, better timelines and deliver the best quality work.
                                </Text>
                                <Button mt="2rem" p="0 2rem" bgColor="#1D70D6" color="#FFFFFF">Send</Button>
                            </Box>
                        </TabPanel>
                        <TabPanel>
                            <Box h="max-content" p="2rem" border="1px solid" borderRadius="0.5rem" borderColor="#D9D9D9" bgColor="inherit">
                                <Box minHeight="25rem" p="1rem" h="max-content" border="1px solid" borderRadius="0.5rem" borderColor="#D9D9D9" color="#26323873" backgroundColor="#FFFFFF">
                                    <Text>All features- </Text>
                                    <Text>Follow the given the format to convey all your features and proposal to have higher chances of getting work.</Text>
                                    <Text mt="1rem">1.Offering 1 in details</Text>
                                    <Text>2.Offering 2, in details</Text>
                                    <Text>3.Offering 3, in details</Text>
                                    <Text mt="1rem">Mention whatever you can offer apart from what you have mentioned in basic details.</Text>
                                </Box>
                                <Button mt="2rem" p="0 2rem" bgColor="#1D70D6" color="#FFFFFF">Send</Button>
                            </Box>
                        </TabPanel>
                    </TabPanels>
                </Tabs>
            </Flex>
        </>
    )
}

export default QuotePrice
