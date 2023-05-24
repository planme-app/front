import React from 'react';
import { Stack } from '@mui/material';
import Typography from '@mui/material/Typography';
import RoutinePercent from 'components/atoms/RoutinePercent';
import RoutineDate from 'components/atoms/RoutineDate';

export default function RoutineCard() {
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
          <RoutineDate />
        </Stack>
        <RoutinePercent size={70} />
      </Stack>
    </>
  );
}
