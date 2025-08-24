import React from 'react';
import { styled } from "@mui/material";

const CustomH2 =(props)=>{
    const StyledCustomH2 = styled('h5')`
       font-family: 'Roboto';
font-style: normal;
font-weight: 700;
font-size: 28px;
line-height: 33px;
color: #384160;
margin : 14px 0 2px 0;
    `
    return(
        <>
        <StyledCustomH2>{props.headingName}</StyledCustomH2> 
        </>
    )
}
export default CustomH2;