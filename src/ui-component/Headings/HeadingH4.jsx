import * as React from "react";
import HeadingCss from './Heading.module.css';
import './heading.css';

export const HeadingH4 = (props) => {
    return(
        <>
       <span> 
       <h4 className={`box ${props.NameColor}`}>{props.Heading }</h4>  
        </span>
        </>
    )
}
