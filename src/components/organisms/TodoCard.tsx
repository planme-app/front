import React from 'react';
import { Stack } from '@mui/material';
import Typography from '@mui/material/Typography';
import TodoPercent from 'components/atoms/TodoPercent';
import TodoDate from 'components/atoms/TodoDate';

export default function TodoCard() {
  return (
    <>
      <Stack
        sx={{
          width: '330px',
          height: '100px',
          borderRadius: '10px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'row',
          backgroundColor: '#F8F8F8',
          mb: 3
        }}
      >
        <Stack
          sx={{
            width: '180px',
            height: '70px',
            display: 'flex',
            justifyContent: 'center'
          }}
        >
          <Typography fontSize={'18px'} fontWeight={'bold'}>
            팔굽혀 펴기
          </Typography>
          <TodoDate />
        </Stack>
        <TodoPercent size={70} />
      </Stack>
    </>
  );
}
