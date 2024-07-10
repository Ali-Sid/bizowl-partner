import Card from 'components/card/Card';
import { HSeparator } from 'components/separator/Separator';
import DownwardArrow from "../assets/img/Down Left Arrow.png";
import React from 'react';
import Line19 from '../assets/img/Line 19.png';

const CustomCard = ({card}) => {
    return (
        <Card width="30%" bgColor={card?.bgColor} style={{boxShadow:"#E5A8CC", marginBottom:"2rem",boxShadow:"2px 4px 14px 0px #E5A8CC"}}>
            <h1 style={{ color: "#1B2559", fontWeight: "bold", fontSize: "1.25rem" }}>{card?.project}</h1>
            <p style={{ color: "#1B2559", fontWeight: "bold" }}>{card?.number}</p>
            <img src={Line19} alt="LineImg"/>
            {/* <div style={{ display: "flex", direction: "row", padding: "0.5rem" }}>
                <img style={{ width: "0.8rem" }} src={DownwardArrow} alt="DownwardArrow" />
                <p style={{ color: "#928D8D", fontSize: "0.7rem" }}><span style={{ marginLeft: "0.3rem", marginRight: "0.3rem", color: "red" }}>2.9%</span> vs 300k last month </p>
            </div> */}
        </Card>
    )
}

export default CustomCard
