import React from 'react';
import { styled } from "@mui/material";

const CustomOptionalH5 =(props)=>{
    const StyledCustomOptionalH5 = styled('h5')`
        font-family: 'Nunito';
font-style: normal;
font-weight: 700;
font-size: 20px;
line-height: 27px;
color: #384160;
display:inline-block;
margin : 0 0 2px 0;
    `
    const StyledCustomSpan = styled('span')`
    font-family: 'Nunito';
font-style: normal;
font-weight: 400;
font-size: 14px;
line-height: 19px;
color: rgba(56, 65, 96, 0.7);
margin : 0 0 2px 0;
`
    return(
        <>
        <StyledCustomOptionalH5>{props.headingName}</StyledCustomOptionalH5> <StyledCustomSpan>{props.optional}</StyledCustomSpan>
        </>
    )
}
export default CustomOptionalH5;