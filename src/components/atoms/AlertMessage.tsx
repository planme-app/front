import React from 'react';
import { Box, Stack, Typography } from '@mui/material';

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

const AlertMessage = React.forwardRef((props: AlertMessageProps, ref) => {
  const { title, message } = props;
  return (
    <Box ref={ref}>
      <Stack sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          {title}
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          {message}
        </Typography>
      </Stack>
    </Box>
  );
});

AlertMessage.displayName = 'AlertMessage';

export default AlertMessage;
