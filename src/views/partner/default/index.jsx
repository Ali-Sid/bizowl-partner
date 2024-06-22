import {
  Avatar,
  Box,
  Button,
  Flex,
  FormLabel,
  Icon,
  Select,
  SimpleGrid,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
// Assets
import Usa from "assets/img/dashboards/usa.png";
import Line18 from "../../../assets/img/dashboards/Line 18.png";
import Line26 from "../../../assets/img/dashboards/Line 26.png";
import BlueCircle from "../../../assets/img/dashboards/Ellipse 627.png";
import DownArrow from "../../../assets/img/dashboards/DownArrow.png";
import ExclusivenessImg from "../../../assets/img/dashboards/exclusiveness.png";
import FlexibleImg from "../../../assets/img/dashboards/flexible.png";
import AuthenticImg from "../../../assets/img/dashboards/authentic.png";
import VectorImg from "../../../assets/img/dashboards/Vector.png";
import Pic1 from "../../../assets/img/avatars/avatar1.png";
import Line19 from '../../../assets/img/dashboards/Line 19.png';
import ProfilePic from "./assets/Ellipse 658.png";
import { DashboardData } from "./data/DashboardData";

// Custom components
import MiniCalendar from "components/calendar/MiniCalendar";
import Card from "components/card/Card";
import MiniStatistics from "components/card/MiniStatistics";
import IconBox from "components/icons/IconBox";
import React, { useEffect, useState } from "react";
import {
  MdAddTask,
  MdAttachMoney,
  MdBarChart,
  MdCheckCircleOutline,
  MdFileCopy,
} from "react-icons/md";
import CheckTable from "views/admin/default/components/CheckTable";
import ComplexTable from "views/admin/default/components/ComplexTable";
import DailyTraffic from "views/admin/default/components/DailyTraffic";
import PieCard from "views/admin/default/components/PieCard";
import Tasks from "views/admin/default/components/Tasks";
import TotalSpent from "views/admin/default/components/TotalSpent";
import WeeklyRevenue from "views/admin/default/components/WeeklyRevenue";
import {
  columnsDataCheck,
  columnsDataComplex,
} from "views/admin/default/variables/columnsData";
import tableDataCheck from "views/admin/default/variables/tableDataCheck.json";
import tableDataComplex from "views/admin/default/variables/tableDataComplex.json";
import CustomCard from "./components/CustomCard";
import { Divider, Menu, MenuItem } from "@mui/material";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { HSeparator } from "components/separator/Separator";

export default function UserReports() {
  // Chakra Color Mode
  const brandColor = useColorModeValue("brand.500", "white");
  const boxBg = useColorModeValue("secondaryGray.300", "whiteAlpha.100");
  const [dashboardData, setDashboardData] = useState([]);
  const [openMenu, setOpenMenu] = useState(false);
  const [tabIndex, setTabIndex] = useState(0);

  useEffect(() => {
    setDashboardData(DashboardData);
  }, [])

  const handleClick = () => {
    setOpenMenu(!openMenu);
  };
  const handleClose = () => {
    setOpenMenu(!openMenu);
  };

  const cards = [
    {
      project: "Ongoing Projects",
      number: 0,
      bgColor: "#E5E6F9"
    },
    {
      project: "Completed Projects",
      number: 0,
      bgColor: "#FFF9E9"
    },
    {
      project: "Approved Enquiries",
      number: 0,
      bgColor: "#E1F2EF"
    },
    {
      project: "Rejected Enquiries",
      number: 0,
      bgColor: "#F3F9FE"
    },
    {
      project: "New Leads",
      number: 0,
      bgColor: "#E5E1F9"
    },
    {
      project: "Pending Leads",
      number: 0,
      bgColor: "#FFEEF7"
    }
  ]
  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
      {/* <SimpleGrid
        columns={{ base: 1, md: 2, lg: 3, "2xl": 6 }}
        gap='20px'
        mb='20px'>
        <MiniStatistics
          startContent={
            <IconBox
              w='56px'
              h='56px'
              bg={boxBg}
              icon={
                <Icon w='32px' h='32px' as={MdBarChart} color={brandColor} />
              }
            />
          }
          name='Earnings'
          value='$350.4'
        />
        <MiniStatistics
          startContent={
            <IconBox
              w='56px'
              h='56px'
              bg={boxBg}
              icon={
                <Icon w='32px' h='32px' as={MdAttachMoney} color={brandColor} />
              }
            />
          }
          name='Spend this month'
          value='$642.39'
        />
        <MiniStatistics growth='+23%' name='Sales' value='$574.34' />
        <MiniStatistics
          endContent={
            <Flex me='-16px' mt='10px'>
              <FormLabel htmlFor='balance'>
                <Avatar src={Usa} />
              </FormLabel>
              <Select
                id='balance'
                variant='mini'
                mt='5px'
                me='0px'
                defaultValue='usd'>
                <option value='usd'>USD</option>
                <option value='eur'>EUR</option>
                <option value='gba'>GBA</option>
              </Select>
            </Flex>
          }
          name='Your balance'
          value='$1,000'
        />
        <MiniStatistics
          startContent={
            <IconBox
              w='56px'
              h='56px'
              bg='linear-gradient(90deg, #4481EB 0%, #04BEFE 100%)'
              icon={<Icon w='28px' h='28px' as={MdAddTask} color='white' />}
            />
          }
          name='New Tasks'
          value='154'
        />
        <MiniStatistics
          startContent={
            <IconBox
              w='56px'
              h='56px'
              bg={boxBg}
              icon={
                <Icon w='32px' h='32px' as={MdFileCopy} color={brandColor} />
              }
            />
          }
          name='Total Projects'
          value='2935'
        />
      </SimpleGrid> */}

      {/* <SimpleGrid columns={{ base: 1, md: 2, xl: 2 }} gap='20px' mb='20px'>
        <TotalSpent />
        <WeeklyRevenue />
      </SimpleGrid>
      <SimpleGrid columns={{ base: 1, md: 1, xl: 2 }} gap='20px' mb='20px'>
        <CheckTable columnsData={columnsDataCheck} tableData={tableDataCheck} />
        <SimpleGrid columns={{ base: 1, md: 2, xl: 2 }} gap='20px'>
          <DailyTraffic />
          <PieCard />
        </SimpleGrid>
      </SimpleGrid> */}
      {/* <SimpleGrid columns={{ base: 1, md: 1, xl: 2 }} gap='20px' mb='20px'>
        <ComplexTable
          columnsData={columnsDataComplex}
          tableData={tableDataComplex}
        />
        <SimpleGrid columns={{ base: 1, md: 2, xl: 2 }} gap='20px'>
          <Tasks />
          <MiniCalendar h='100%' minW='100%' selectRange={false} />
        </SimpleGrid>
      </SimpleGrid> */}
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "2rem" }}>
        <Card
          width="63%"
          flexDirection="row"
          bgColor="#E1F2EF"
        >
          <div style={{ display: "flex", flexDirection: "column" }}>
            <h1 style={{ fontSize: "1.5rem", fontWeight: "bold", color: "#1B2559" }}>
              Welcome back, Partner
            </h1>
            <p style={{ fontSize: "1rem" }}>
              Be the part of something good.
              Get more customers without the hassles of finding new ones.
              We bring and you deliver.
            </p>
          </div>
          <div>
            <img src={VectorImg} alt="Vector Img" />
          </div>
        </Card>
        <Card
          width="33%"
          boxShadow="0rem 0.25rem 0.25rem 0rem rgba(0, 0, 0, 0.25)"
        >
          <div
            style={{
              color: "#1B2559",
              fontSize: "1.5rem",
              fontWeight: "bold",
              bgColor: "#F7F8FD"
            }}
          >
            <h1>Total Earnings</h1>
            <p>0 INR</p>
          </div>
          <Text w="max-content" fontSize="sm" cursor="pointer">View History</Text>
          <HSeparator/>
        </Card>
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "2rem"
        }}
      >
        <h1 style={{ fontSize: "1.5rem", fontWeight: "bold" }}>Analytics</h1>
        <Card
          width="16%"
          height="5vh"
          display="flex"
          flexDirection="row"
          alignItems="center"
          justifyContent="center"
          bgColor="#D7E9FD"
          marginBottom="1rem"
          style={{ boxShadow: "0rem 0.25rem 0.25rem 0rem rgba(0, 0, 0, 0.25)" }}
        >
          <div>Last 7 Days</div>
          <div style={{ width: "28%", position: "relative", cursor: "pointer" }}>
            <img src={BlueCircle} alt="BlueCircle" />
            <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}>
              <img src={DownArrow} alt="DownArrowImg" />
            </div>
          </div>
        </Card>
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: "space-between", marginBottom: "3rem" }}>
        {cards.map((card, index) => (
          <CustomCard key={index} card={card} />
        ))}
      </div>
      <Card
        display="flex"
        height="60vh"
        alignItems="center"
        color="#37474F"
        padding="1rem"
        boxShadow="0.0625rem 0.0625rem 0.25rem 0rem rgba(64, 123, 255, 0.43) inset"
      >
        <h1 style={{ fontWeight: "bold", fontSize: "1.7rem", marginBottom: "1rem" }}>Boost Your Visiblity</h1>
        <div style={{ display: "flex" }}>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <h1 style={{ fontWeight: "bold", fontSize: "1.7rem" }}>Exclusiveness</h1>
            <img src={ExclusivenessImg} alt="ExclusivenessImg" style={{ width: "10rem" }} />
            <p style={{ margin: "1rem" }}>
              Always try to give exclusive price to
              user requesting their service on Bizowl.
              This will get you more clients,.</p>
          </div>
          <img style={{ height: "40vh" }} src={Line26} alt="LineImg" />
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <h1 style={{ fontWeight: "bold", fontSize: "1.7rem" }}>Authentic</h1>
            <img src={AuthenticImg} alt="AuthenticImg" style={{ width: "7rem" }} />
            <p style={{ margin: "1rem" }}>
              Try to be more authentic and
              believe in provide value. Provide
              your best work, top quality work.
            </p>
          </div>
          <img style={{ height: "40vh" }} src={Line26} alt="LineImg" />
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <h1 style={{ fontWeight: "bold", fontSize: "1.7rem" }}>Flexible</h1>
            <img src={FlexibleImg} alt="FlexibleImg" style={{ width: "7rem" }} />
            <p style={{ margin: "1rem" }}>
              People who are ideal customer of
              bizowl are early stage startup, Low
              budget client. Be flexible.
            </p>
          </div>
        </div>
      </Card>
      {/* <MiniCalendar h='100%' minW='100%' selectRange={false} /> */}
      <Flex mt="3rem" justifyContent="space-between">
        <Box
          backgroundColor="#FFFFFF"
          width="55%"
          height="110vh"
          borderRadius="0.6rem"
        >
          <Flex
            pl="1rem"
            pr="1rem"
            fontWeight="bold"
            justifyContent="space-between"
            alignItems="center"
            height="4rem"
            backgroundColor="#E1F2EF"
            borderRadius="0.9rem"
          >
            <Text>Inbox</Text>
            <Text>View All</Text>
          </Flex>
          <div></div>
        </Box>
        <Box
          backgroundColor="#FFFFFF"
          //backgroundColor="#F0F0F0"
          width="40%"
          height="110vh"
          borderRadius="0.6rem"
          position="relative"
        >
          <Tabs
            position="absolute"
            variant='unstyled'
            width="100%"
            pl="1rem"
            pr="1rem"
            height="4rem"
            backgroundColor="#E1F2EF"
            //backgroundColor="#D9D9D9"
            borderRadius="0.9rem"
          >
            <TabList
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              paddingTop="1rem"
            >
              <Tab fontWeight="bold">Meetings</Tab>
              <Tab fontWeight="bold">Calendar</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <Flex justifyContent="space-between">
                  <Box backgroundColor="#407BFFE5" borderRadius="2rem" padding="0.5rem 1.5rem 0.5rem 1.5rem">Upcoming</Box>
                  <Box backgroundColor="#D9D9D9" borderRadius="2rem" padding="0.5rem 1.5rem 0.5rem 1.5rem" >Past</Box>
                </Flex>
                {dashboardData.map((item, index) => (
                  <Box
                    key={index}
                    p="1rem"
                    mt="1.5rem"
                    height="auto"
                    borderRadius="1rem"
                    boxShadow="0.4375rem 0rem 0.25rem 0rem rgba(64, 123, 255, 0.65),-0.4375rem 0rem 0.25rem 0rem rgba(64, 123, 255, 0.65)"
                  >
                    <Flex>
                      <Avatar src={ProfilePic} />
                      <Flex
                        ml="1rem"
                        flexDirection="column">
                        <h1 style={{ fontWeight: "bold" }}>{item?.name}</h1>
                        <p style={{ fontSize: "0.6rem" }}>{item?.service}</p>
                      </Flex>
                    </Flex>
                    <Text ml="0.8rem" fontSize="0.68rem">Meeting regarding digital marketing project, Timelines
                      deciding point. FAQ asked.</Text>
                    <Text mt="0.4rem" fontSize='0.7rem' fontWeight="bold">
                      <span style={{ marginLeft: "0.8rem", marginRight: "1rem" }}>{item.startTime}</span>
                      <span>{item?.startDate}</span>
                    </Text>
                    <Flex
                      justifyContent="space-between">
                      <Flex
                        alignItems="center"
                        padding="0.2rem 1rem 0.2rem 1rem"
                        borderRadius="1rem"
                        backgroundColor="#86F477B0"
                        fontSize="15px"
                        boxShadow="0rem 0.25rem 0.25rem 0rem rgba(0, 0, 0, 0.25)"
                      >
                        <Icon mr="0.5rem" as={MdCheckCircleOutline} color="#50C878" />
                        <span>Going</span>
                      </Flex>
                      <Flex
                        alignItems="center"
                        padding="0.2rem 1rem 0.2rem 1rem"
                        borderRadius="1rem"
                        backgroundColor="#FB83838F"
                        boxShadow="0rem 0.25rem 0.25rem 0rem rgba(0, 0, 0, 0.25)"
                      >
                        <Icon mr="0.5rem" as={AiOutlineCloseCircle} color="#DE3163" />
                        Cancel
                      </Flex>
                    </Flex>
                  </Box>
                ))}

              </TabPanel>
              <TabPanel marginTop="1rem">
                <MiniCalendar h='100%' minW='100%' selectRange={false} />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Box>
      </Flex>
    </Box>

  );
}
