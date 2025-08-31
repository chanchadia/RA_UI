import  React from 'react';

import Snackbar from '@mui/material/Snackbar';
import { Alert } from '@mui/material';

export default function SuccessAlert({successAlert}) {
  

  const { vertical, horizontal, open,message,isAlpha=false, isError, handleClose} = successAlert;

  return (
    <div>
     <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={open}
        onClose={handleClose}
        //message={message}
        key={vertical + horizontal}
        autoHideDuration={3000}
        //style={{width: '100%',marginTop: isAlpha ? '60px' : 0}}
      >
          <Alert
            onClose={handleClose}
            severity= {isError ? "error" : "success"}
            variant="filled"
            sx={{ width: '100%' }}>
              {isError && message==='Failed to fetch' ? 'Please check your network connection.' : message}
          </Alert>
      </Snackbar>
    </div>
  );
}
