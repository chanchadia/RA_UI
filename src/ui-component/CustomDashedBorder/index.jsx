import React from 'react';
import { styled } from "@mui/material";

const CustomDashedBorder =()=>{
    const StyledCustomDashedBorder = styled('p')`
        border-bottom: 1px dashed #A8B6BB;
        margin: 0px 0 30px 0px;
        padding: 0 0 20px 0;
    `

    return(
        <>
        <StyledCustomDashedBorder></StyledCustomDashedBorder>
        
        </>
    )
}
export default CustomDashedBorder;