import React from "react";

// Chakra imports
import {
  Box,
  Button,
  Flex,
  Grid,
  Link,
  Text,
  useColorModeValue,
  SimpleGrid,
} from "@chakra-ui/react";

// Custom components
import Banner from "views/admin/marketplace/components/Banner";
import TableTopCreators from "views/admin/marketplace/components/TableTopCreators";
import HistoryItem from "views/admin/marketplace/components/HistoryItem";
import NFT from "components/card/NFT";
import Card from "components/card/Card.js";

// Assets
import webdev from "assets/img/nfts/webdev.jpg"
import digital from "assets/img/nfts/digital.jpg"
import graphic from "assets/img/nfts/graphic.jpg"
import market from "assets/img/nfts/market.jpg"
import ad from "assets/img/nfts/ad.jpg"
import biz from "assets/img/nfts/biz.jpg"
// import Nft1 from "assets/img/nfts/Nft1.png";
// import Nft2 from "assets/img/nfts/Nft2.png";
// import Nft3 from "assets/img/nfts/Nft3.png";
// import Nft4 from "assets/img/nfts/Nft4.png";
// import Nft5 from "assets/img/nfts/Nft5.png";
// import Nft6 from "assets/img/nfts/Nft6.png";
import Avatar1 from "assets/img/avatars/avatar1.png";
import Avatar2 from "assets/img/avatars/avatar2.png";
import Avatar3 from "assets/img/avatars/avatar3.png";
import Avatar4 from "assets/img/avatars/avatar4.png";
import tableDataTopCreators from "views/admin/marketplace/variables/tableDataTopCreators.json";
import { tableColumnsTopCreators } from "views/admin/marketplace/variables/tableColumnsTopCreators";

export default function Marketplace() {
  // Chakra Color Mode
  const textColor = useColorModeValue("secondaryGray.900", "white");
  const textColorBrand = useColorModeValue("brand.500", "white");
  return (
    <Box pt={{ base: "180px", md: "80px", xl: "80px" }}>
      {/* Main Fields */}
      <Grid
        mb='20px'
        gridTemplateColumns={{ xl: "repeat(2, 1fr)", "2xl": "1fr 0.46fr" }}
        gap={{ base: "20px", xl: "20px" }}
        display={{ base: "block", xl: "grid" }}>
        <Flex
          flexDirection='column'
          gridArea={{ xl: "1 / 1 / 2 / 3", "2xl": "1 / 1 / 2 / 2" }}>
          <Banner />
          <Flex direction='column'>
            <Flex
              mt='45px'
              mb='20px'
              justifyContent='space-between'
              direction={{ base: "column", md: "row" }}
              align={{ base: "start", md: "center" }}>
              <Text color={textColor} fontSize='2xl' ms='24px' fontWeight='700'>
                Available Services
              </Text>
              {/* <Flex
                align='center'
                me='20px'
                ms={{ base: "24px", md: "0px" }}
                mt={{ base: "20px", md: "0px" }}>
                <Link
                  color={textColorBrand}
                  fontWeight='500'
                  me={{ base: "34px", md: "44px" }}
                  to='#art'>
                  Digital Marketing
                </Link>
                <Link
                  color={textColorBrand}
                  fontWeight='500'
                  me={{ base: "34px", md: "44px" }}
                  to='#music'>
                  Web Development
                </Link>
                <Link
                  color={textColorBrand}
                  fontWeight='500'
                  me={{ base: "34px", md: "44px" }}
                  to='#collectibles'>
                  Advertising
                </Link>
                <Link color={textColorBrand} fontWeight='500' to='#sports'>
                  Design
                </Link>
              </Flex> */}
            </Flex>
            <SimpleGrid columns={{ base: 1, md: 3 }} gap='20px'>
              <NFT
                name='Website Development'
                author='By Esthera Jackson'
                bidders={[
                  Avatar1,
                  Avatar2,
                  Avatar3,
                  Avatar4,
                  Avatar1,
                  Avatar1,
                  Avatar1,
                  Avatar1,
                ]}
                image={webdev}
                currentbid='₹ 10,000'
                download='#'
              />
              <NFT
                name='Digital Marketing'
                author='By Nick Wilson'
                bidders={[
                  Avatar1,
                  Avatar2,
                  Avatar3,
                  Avatar4,
                  Avatar1,
                  Avatar1,
                  Avatar1,
                  Avatar1,
                ]}
                image={digital}
                currentbid='₹ 25,000'
                download='#'
              />
              <NFT
                name='Graphic Design Service'
                author='By Will Smith'
                bidders={[
                  Avatar1,
                  Avatar2,
                  Avatar3,
                  Avatar4,
                  Avatar1,
                  Avatar1,
                  Avatar1,
                  Avatar1,
                ]}
                image={graphic}
                currentbid='₹ 3000'
                download='#'
              />
            </SimpleGrid>
            <Text
              mt='45px'
              mb='36px'
              color={textColor}
              fontSize='2xl'
              ms='24px'
              fontWeight='700'>
              Recently Added
            </Text>
            <SimpleGrid
              columns={{ base: 1, md: 3 }}
              gap='20px'
              mb={{ base: "20px", xl: "0px" }}>
              <NFT
                name='Marketing'
                author='By Peter Will'
                bidders={[
                  Avatar1,
                  Avatar2,
                  Avatar3,
                  Avatar4,
                  Avatar1,
                  Avatar1,
                  Avatar1,
                  Avatar1,
                ]}
                image={market}
                currentbid='₹ 5000'
                download='#'
              />
              <NFT
                name='Advertising'
                author='By Mark Benjamin'
                bidders={[
                  Avatar1,
                  Avatar2,
                  Avatar3,
                  Avatar4,
                  Avatar1,
                  Avatar1,
                  Avatar1,
                  Avatar1,
                ]}
                image={ad}
                currentbid='₹ 20,000'
                download='#'
              />
              <NFT
                name='Business Fundamental Services'
                author='By Manny Gates'
                bidders={[
                  Avatar1,
                  Avatar2,
                  Avatar3,
                  Avatar4,
                  Avatar1,
                  Avatar1,
                  Avatar1,
                  Avatar1,
                ]}
                image={biz}
                currentbid='₹ 50,000'
                download='#'
              />
            </SimpleGrid>
          </Flex>
        </Flex>
        {/* <Flex
          flexDirection='column'
          gridArea={{ xl: "1 / 3 / 2 / 4", "2xl": "1 / 2 / 2 / 3" }}>
          <Card px='0px' mb='20px'>
            <TableTopCreators
              tableData={tableDataTopCreators}
              columnsData={tableColumnsTopCreators}
            />
          </Card>
          <Card p='0px'>
            <Flex
              align={{ sm: "flex-start", lg: "center" }}
              justify='space-between'
              w='100%'
              px='22px'
              py='18px'>
              <Text color={textColor} fontSize='xl' fontWeight='600'>
                History
              </Text>
              <Button variant='action'>See all</Button>
            </Flex>

            <HistoryItem
              name='Colorful Heaven'
              author='By Mark Benjamin'
              date='30s ago'
              image={Nft5}
              price='₹ 25,000'
            />
            <HistoryItem
              name='Abstract Colors'
              author='By Esthera Jackson'
              date='58s ago'
              image={Nft1}
              price='₹ 25,000'
            />
            <HistoryItem
              name='ETH AI Brain'
              author='By Nick Wilson'
              date='1m ago'
              image={Nft2}
              price='₹ 25,000'
            />
            <HistoryItem
              name='Swipe Circles'
              author='By Peter Will'
              date='1m ago'
              image={Nft4}
              price='₹ 25,000'
            />
            <HistoryItem
              name='Mesh Gradients '
              author='By Will Smith'
              date='2m ago'
              image={Nft3}
              price='₹ 25,000'
            />
            <HistoryItem
              name='3D Cubes Art'
              author='By Manny Gates'
              date='3m ago'
              image={Nft6}
              price='₹ 25,000'
            />
          </Card>
        </Flex> */}
      </Grid>
      {/* Delete Product */}
    </Box>
  );
}
