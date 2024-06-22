import Card from 'components/card/Card';
import { HSeparator } from 'components/separator/Separator';
import DownwardArrow from "../../../../assets/img/dashboards/Down Left Arrow.png";
import React from 'react';
import Line19 from '../../../../assets/img/dashboards/Line 19.png';
import { Flex, Icon, Text } from '@chakra-ui/react';
import { LuMoveDownRight } from 'react-icons/lu';

const CustomCard = ({card}) => {
    return (
        <Card width="30%" bgColor={card?.bgColor} style={{boxShadow:"#E5A8CC", marginBottom:"2rem",boxShadow:"2px 4px 14px 0px #E5A8CC"}}>
            <Text color="#1B2559" fontWeight="bold" fontSize="1.25rem">{card?.project}</Text>
            <Text color="#1B2559" fontWeight="bold">{card?.number}</Text>
            <HSeparator/>
            <Flex p="0.5rem">
                <Icon as={LuMoveDownRight} color="red"/>
                <Text color="#928D8D" fontSize="0.7rem"><span style={{ marginLeft: "0.3rem", marginRight: "0.3rem", color: "red" }}>2.9%</span> vs 300k last month </Text>
            </Flex>
        </Card>
    )
}

export default CustomCard
