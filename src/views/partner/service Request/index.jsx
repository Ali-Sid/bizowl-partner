import { Box, Flex, Icon, Spinner } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
// import { columnsDataComplex } from "../dataTables/variables/columnsData";
import ComplexTable from "./components/ComplexTable";
import tableDataComplex from "../../admin/default/variables/tableDataComplex.json"
import { MdViewModule } from "react-icons/md";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { db } from "config/firebase";

const Project = () => {
    const [unSubscribe, setUnSubscribe] = useState(null)
    const [projectData, setProjectData] = useState([])
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        getServiceRequests();
        return () => {
            if (unSubscribe) {
                unSubscribe();
            }
        };
    }, []);

    const getServiceRequests = async () => {
        try {
            const userId = sessionStorage.getItem('userId')
            const userQuery = query(collection(db, 'quotations'), where('notifiedPartners', 'array-contains', userId));
            const subScribe = onSnapshot(userQuery, (snapshot) => {
                const serviceRequests = snapshot.docs.map((doc, index) => {
                    return ({
                        ...doc.data(),
                        srNo: index + 1,
                        id: doc.id,
                        name: `${doc.data().userDetails?.firstName}  ${doc.data().userDetails?.lastName}`,
                        email: doc.data().userDetails?.email,
                        phone: doc.data().userDetails?.phone,

                    })
                });
                console.log(serviceRequests)
                setProjectData(serviceRequests);
                setLoading(false);
            });
            setUnSubscribe(() => subScribe)
        } catch (error) {
            console.log(error.message);
            setLoading(false);
        }
    }
    const columnsDataComplex = [
        {
            Header: "CLIENT NAME",
            accessor: "name",
        },
        {
            Header: "CLIENT EMAIL",
            accessor: "email",
        },
        {
            Header: "BUDGET",
            accessor: "budget",
        },
        {
            Header: "PROGRESS",
            accessor: "progress",
        }
    ];
    const dummyProjectData = [
        {
            name: "Client 1",
            email: "client1@gmail.com",
            budget: "5-10K",
            progress: 50
        },
        {
            name: "Client 2",
            email: "client2@gmail.com",
            budget: "15-20K",
            progress: 75.5
        },
        {
            name: "Client 3",
            email: "client3@gmail.com",
            budget: "55-100K",
            progress: 25
        },
        {
            name: "Client 4",
            email: "client4@gmail.com",
            budget: "35-50K",
            progress: 60
        }
    ]



    return (
        <Box pt={{ base: "180px", md: "80px", xl: "80px" }}>
            <Flex align="center" justify="center" h="100%">
                {/* {loading ? (
                    <Spinner size="xl" marginTop={'5rem'} />
                ) : ( */}
                <ComplexTable
                    columnsData={columnsDataComplex}
                    tableData={dummyProjectData}
                />
                {/* )} */}

            </Flex>
        </Box>
    );
};
export default Project;