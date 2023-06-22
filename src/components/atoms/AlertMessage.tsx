import React from 'react';
import Typography from '@mui/material/Typography';
import { Stack } from '@mui/material';

const style = {
  position: 'absolute' as const,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '80%',
  bgcolor: 'white',
  boxShadow: 24,
  p: 4
};

export interface AlertMessageProps {
  title: string;
  message: string;
}

export default function AlertMessage(props: AlertMessageProps) {
  const { title, message } = props;
  return (
    <Stack sx={style}>
      <Typography id="modal-modal-title" variant="h6" component="h2">
        {title}
      </Typography>
      <Typography id="modal-modal-description" sx={{ mt: 2 }}>
        {message}
      </Typography>
    </Stack>
  );
}
