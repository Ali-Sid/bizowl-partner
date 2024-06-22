import { Box, Flex, Icon } from "@chakra-ui/react";
import React from "react";
// import { columnsDataComplex } from "../dataTables/variables/columnsData";
import ComplexTable from "./components/ComplexTable";
import tableDataComplex from "../../admin/default/variables/tableDataComplex.json"
import { MdViewModule } from "react-icons/md";

const Project = () => {
    const columnsDataComplex = [
        {
            Header: "NAME",
            accessor: "name",
        },
        {
            Header: "STATUS",
            accessor: "status",
        },
        {
            Header: "DATE",
            accessor: "date",
        },
        {
            Header: "PROGRESS",
            accessor: "progress",
        },
        {
            Header: "ACTION",
            accessor: "action"
        }
    ];
    const projectData = [
        {
            "name": "Project 1",
            "status": "Approved",
            "date": "18 Apr 2022",
            "progress": 75.5,
        },
        {
            "name": "Project 2",
            "status": "Disable",
            "date": "18 Apr 2022",
            "progress": 25.5,
        },
        {
            "name": "Project 3",
            "status": "Error",
            "date": "20 May 2021",
            "progress": 90,
        },
        {
            "name": "Project 4",
            "status": "Approved",
            "date": "12 Jul 2021",
            "progress": 50.5,
        },
        {
            "name": "Project 5",
            "status": "Approved",
            "date": "24 Jan 2024",
            "progress": 60,
        }
    ]
    return (
        <Box pt={{ base: "180px", md: "80px", xl: "80px" }}>
            <Flex align="center" justify="center" h="100%">
                <ComplexTable
                    columnsData={columnsDataComplex}
                    tableData={projectData}
                />
            </Flex>
        </Box>
    );
};
export default Project;