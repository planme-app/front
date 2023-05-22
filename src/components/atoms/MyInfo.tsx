import React from 'react';
import { Stack } from '@mui/material';
import Typography from '@mui/material/Typography';

export interface MyInfoProps {
  title?: string;
  content?: string;
}

export default function MyInfo({ title, content }: MyInfoProps) {
  return (
    <Stack
      display={'flex'}
      justifyContent={'center'}
      sx={{
        mt: 5,
        width: '300px',
        height: '80px'
      }}
    >
      <Typography
        sx={{
          fontWeight: 700
        }}
      >
        {title}
      </Typography>
      <Typography
        pl={2}
        sx={{
          display: 'flex',
          alignItems: 'center',
          borderRadius: '10px',
          height: '40px',
          backgroundColor: 'gray'
        }}
      >
        {content}
      </Typography>
    </Stack>
  );
}
