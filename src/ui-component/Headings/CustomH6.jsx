import React from 'react';
import { styled } from "@mui/material";

const CustomH6 =(props)=>{
    const StyledCustomH6 = styled('h6')`
        font-family: 'Nunito';
        font-style: normal;
        font-weight: 400;
        font-size: 14px;
        line-height: 19px;
        color: #384160;
        margin : 0 0 2px 0;
    `
    return(
        <>
        <StyledCustomH6>{props.headingName}</StyledCustomH6>
        
        </>
    )
}
export default CustomH6;