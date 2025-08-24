//MUI imports
import { styled } from "@mui/material/styles";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";

//Reusable styled tooltip for showing error as in login password validation field.

export const styledTooltipError = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: "#FF5A50",
    color: "#FFFFF",
    maxWidth: 300,
    width: 200,
    fontFamily: "Nunito",
    fontStyle: "normal",
    fontWeight: 550,
    fontSize: "14px",
    lineHeight: "19px",
    paddingLeft: "15px",
   // textAlign:'center',
   },
}));
export default styledTooltipError;
