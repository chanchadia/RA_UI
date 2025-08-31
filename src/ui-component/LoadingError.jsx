import { Alert } from "@mui/material";
import { CancelButton } from "./Controls/Button";

export default function LoadingError(props)
{
    return (<>
        <div>
             <Alert
                    severity= "error"
                    variant="filled"
                    >
                      Failed to fetch data
                  </Alert>
        </div>
        <CancelButton onClick={props.onClick}>Try again</CancelButton>
    </>);
}