import React from 'react';
import { styled } from "@mui/material";

const CustomH5 =(props)=>{
    const StyledCustomH5 = styled('h5')`
        font-family: 'Nunito';
font-style: normal;
font-weight: 700;
font-size: 20px;
line-height: 27px;
color: #384160;
margin : 0 0 2px 0;
    `

    return(
        <>
        <StyledCustomH5>{props.headingName}</StyledCustomH5>
        
        </>
    )
}
export default CustomH5;