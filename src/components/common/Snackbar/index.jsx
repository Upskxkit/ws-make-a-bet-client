import React from 'react';
import { Alert as MuiAlert, AlertTitle } from '@material-ui/lab';
import { Snackbar as MUISnackbar } from '@material-ui/core';
import { SnackbarType } from 'hooks/useSnackbar';



export const Snackbar = ({ message, type, title, handleClose }) => {
  return (
    <MUISnackbar
      open={!!message}
      autoHideDuration={
        type === SnackbarType.Info || type === SnackbarType.Error ? null : 6000
      }
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      onClose={handleClose}
    >
      {!!message ? (
        <Alert
          onClose={handleClose}
          severity={type || 'success'}
          style={{ whiteSpace: 'pre-line' }}
        >
          <AlertTitle>{title}</AlertTitle>
          {message}
        </Alert>
      ) : (
        <div /> // prevents empty alert on close transition
      )}
    </MUISnackbar>
  );
};

function Alert(props) {
  return <MuiAlert elevation={6} variant="standard" {...props} />;
}
