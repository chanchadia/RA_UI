import  React from 'react';

import Snackbar from '@mui/material/Snackbar';

export default function SuccessAlert({successAlert,handleClose}) {
  

  const { vertical, horizontal, open,message,isAlpha=false} = successAlert;

  return (
    <div>
     <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={open}
        onClose={handleClose}
        message={message}
        key={vertical + horizontal}
        autoHideDuration={3000}
        style={{width: '100%',marginTop: isAlpha ? '60px' : 0}}
      />
    </div>
  );
}
