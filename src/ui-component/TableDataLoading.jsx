import { Skeleton, TableCell, TableRow } from "@mui/material";

export default function TableDataLoading(props)
{
    return (Array.from({ length: props.rows || 8}).map((row)=>{
        return (<TableRow sx={{ height: '40px' }}>
        {
            Array.from({ length: props.cols || 1}).map(() => {
                return (<TableCell sx={{ paddingTop: 0.8, paddingBottom: 0 }}>
                            <Skeleton height={props.height} />
                        </TableCell>);
            })
        }
        </TableRow>);
    })
    );
}