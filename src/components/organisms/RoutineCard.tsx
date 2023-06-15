import React from 'react';
import Link from 'next/link';
import { Box, Stack } from '@mui/material';
import Skeleton from '@mui/material/Skeleton';
import Typography from '@mui/material/Typography';
import RoutinePercent from 'components/atoms/RoutinePercent';
import RoutineDate from 'components/atoms/RoutineDate';

interface RoutineInfo {
  routineId?: string;
  routineTitle?: string;
  routineDays?: string[];
  cardProgress?: number | boolean;
  cardGoal?: number | boolean;
}

export default function RoutineCard({
  routineId,
  routineTitle,
  routineDays,
  cardProgress,
  cardGoal
}: RoutineInfo) {
  const value = Math.floor((Number(cardProgress) / Number(cardGoal)) * 100);

  if (!routineTitle) {
    return (
      <Box
        sx={{
          width: '330px',
          height: '100px',
          borderRadius: '10px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-around',
          flexDirection: 'row',
          backgroundColor: '#F8F8F8',
          mb: 3
        }}
      >
        <Skeleton variant="text" width={180} height={40} />
        <Skeleton variant="rectangular" width={180} height={70} />
        <Skeleton variant="circular" width={70} height={70} />
      </Box>
    );
  }

  return (
    <Link
      href={`routine/detail/${routineId}`}
      style={{ textDecoration: 'none', color: 'black' }}
    >
      <Box
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
            {routineTitle}
          </Typography>
          <RoutineDate routineDays={routineDays} />
        </Stack>
        <RoutinePercent size={70} routineCardValue={value} />
      </Box>
    </Link>
  );
}
