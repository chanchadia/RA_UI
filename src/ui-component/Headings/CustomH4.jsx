import * as React from "react";
import HeadingCss from './Heading.module.css'

export const CustomH4 = (props) => {
    return(
        <>
       <span> 
       <h4>{props.Heading }</h4>  
       <h4>{props.boldHeading}</h4>
        </span>
        </>
    )
}
