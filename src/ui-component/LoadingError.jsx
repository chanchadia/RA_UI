import { Alert, Button, Card, CardActions, CardContent, Typography } from "@mui/material";
import { CancelButton } from "./Controls/Button";

export default function LoadingError(props)
{
    return (<>
       

        <div style={{display:'flex', justifyContent:'center', paddingTop: '70px'}}>
        <Card sx={{ minWidth: 500, maxWidth: 1000 }} elevation={3}>
            <CardContent>

                <Typography variant="h5"  sx={{mb: 2, color: 'error.main'}}>
                Error
                </Typography>

                <Typography>
                {props.err==='Failed to fetch' ? 'Can not connect to network, check your network connection.' : props.err}
                </Typography>
                <br/>
                <Typography sx={{ color: 'text.secondary'}}>
                    Please try again.
                </Typography>
            </CardContent>
            <CardActions sx={{display:'flex', justifyContent:'right'}}>
                <Button size="large" onClick={props.onClick}>Try Now</Button>
            </CardActions>
        </Card>
            
        </div>
    </>);
}