import {
  Button,
  Flex,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  filter,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import {
  QueriesColumn,
  QueriesRow,
  SingleQueryRow,
  SingleQueryColumn,
} from "../data/InboxData";
import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";

const QueriesTable = () => {
  const [columnData, setColumnData] = useState([]);
  const [rowData, setRowData] = useState([]);
  const [queryStatus, setQueryStatus] = useState(true);
  const [singleQueryColumnData, setSingleQueryColumnData] = useState([]);
  const [singleQueryRowData, setSingleQueryRowData] = useState();
  const [queryId, setQueryId] = useState(1);
  const [assignments, setAssignments] = useState([]);
  const [selectedAssignment, setSelectedAssignment] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const partnerUid = sessionStorage.getItem("uid"); // Retrieve UID from sessionStorage
        if (!partnerUid) {
          console.error("No partner UID found in sessionStorage.");
          return; // Exit if no UID is found
        }

        const db = getFirestore();
        const q = query(
          collection(db, "assignments"),
          where("partner.uid", "==", partnerUid)
        );
        const querySnapshot = await getDocs(q);
        const itemsList = querySnapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setAssignments(itemsList);
      } catch (error) {
        console.error("Error fetching assignments:", error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleQueryStatus = (id) => {
    setSelectedAssignment(
      assignments.find((assignment) => assignment.id === id)
    ); // Find the selected assignment
    setQueryStatus(!queryStatus);
  };

  useEffect(() => {
    setColumnData(QueriesColumn);
    setRowData(QueriesRow);
    setSingleQueryColumnData(SingleQueryColumn);
    setSingleQueryRowData(SingleQueryRow);
    setSelectedAssignment(selectedAssignment);
    setAssignments(assignments);
  }, []);

  //   const handleQueryStatus = (id) => {
  //     console.log("Id :", id);
  //     setQueryStatus(!queryStatus);
  //     setQueryId(id);
  //   };
  //   console.log("Query STatus :", queryStatus);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      {queryStatus ? (
        <TableContainer>
          <Table
            variant="simple"
            overflowX="hidden"
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
              {assignments.map((assignment, index) => (
                <Tr
                  key={index}
                  backgroundColor="#EBF2FA"
                  boxShadow="0rem 0.25rem 0.25rem 0rem #00000025"
                >
                  {/* Render each field of the assignment */}
                  <Td>{assignment.rowData.services}</Td>
                  <Td>{assignment.rowData.startDate}</Td>
                  <Td>{assignment.rowData.firstName}</Td>
                  <Td>₹{assignment.rowData.budget}</Td>
                  <Td>{assignment.rowData.projectType}</Td>
                  <Td>{assignment.rowData.timeLine}</Td>
                  {/* <Td>{assignment.industry}</Td>
                  <Td>{assignment.timeline}</Td> */}
                  <Td>Immediately</Td>
                  <Td>
                    <Button
                      onClick={() => {
                        setQueryStatus(!queryStatus);
                      }}
                      variant="outlined"
                      size="sm"
                      color="#407BFF"
                    >
                      Open
                    </Button>
                  </Td>
                </Tr>
              ))}
              {/* {rowData.map((item, index) => (
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
                            ))} */}
            </Tbody>
          </Table>
        </TableContainer>
      ) : (
        <TableContainer>
          <Table
            variant="simple"
            overflowX="hidden"
            style={{ borderCollapse: "separate", borderSpacing: "0 1rem" }}
          >
            <Thead>
              <Tr backgroundColor="#D0E3F3">
                {singleQueryColumnData?.map((item, index) => (
                  <Th key={index}>{item}</Th>
                ))}
              </Tr>
            </Thead>
            <Tbody>
              {/* {singleQueryRowData
                .filter((item) => item.id === queryId)
                .map((filterItem, index) => (
                  <Tr
                    key={index}
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
                      <Flex direction="column">
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
                    <Td
                      cursor="pointer"
                      onClick={() => {
                        setQueryStatus(!queryStatus);
                      }}
                    >
                      <Text color="#407BFF">Open</Text>
                    </Td>
                  </Tr>
                ))} */}
              <Td>{selectedAssignment.rowData.services}</Td>
              <Td>{selectedAssignment.rowData.startDate}</Td>
              <Td>{selectedAssignment.rowData.firstName}</Td>
              <Td>₹{selectedAssignment.rowData.budget}</Td>
              <Td>{selectedAssignment.rowData.projectType}</Td>
              <Td>{selectedAssignment.rowData.timeLine}</Td>
              {/* <Td>{assignment.industry}</Td>
                  <Td>{assignment.timeline}</Td> */}
              <Td>Immediately</Td>
              <Td>New</Td>
              <Td>
                <Button
                  onClick={() => {
                    setQueryStatus(!queryStatus);
                  }}
                  variant="outlined"
                  size="sm"
                  color="#407BFF"
                >
                  Open
                </Button>
              </Td>
            </Tbody>
          </Table>
        </TableContainer>
      )}
    </>
  );
};

export default QueriesTable;
