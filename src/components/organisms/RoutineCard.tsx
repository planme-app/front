import React from 'react';
import Link from 'next/link';
import { useRecoilValue } from 'recoil';
import { routineDate } from 'stores/routineStore';
import { Box, Stack, Skeleton, Typography } from '@mui/material';
import RoutinePercent from 'components/atoms/RoutinePercent';
import RoutineDate from 'components/atoms/RoutineDate';
import dayjs from 'dayjs';

interface RoutineInfo {
  routineId?: string;
  routineTitle?: string;
  routineDays?: string[];
  cardProgress?: number | boolean;
  cardGoal?: number | boolean;
  dataCy?: string;
}

export default function RoutineCard({
  routineId,
  routineTitle,
  routineDays,
  cardProgress,
  cardGoal,
  dataCy
}: RoutineInfo) {
  const value = Math.floor((Number(cardProgress) / Number(cardGoal)) * 100);
  const day = useRecoilValue(routineDate);
  const nextDay = dayjs().add(1, 'd').format('YYYY-mm-dd');
  const isDisabled = day === nextDay;

  const linkStyle = {
    textDecoration: 'none',
    color: 'black',
    cursor: isDisabled ? 'none' : 'pointer'
  };

  const handleClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    if (isDisabled) {
      event.preventDefault();
    }
  };

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
      id={dataCy}
      href={isDisabled ? '#' : `routine/detail/${routineId}`}
      style={linkStyle}
      onClick={handleClick}
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
        {isDisabled ? (
          <Stack
            sx={{
              width: '70px',
              height: '50px',
              display: 'flex',
              justifyContent: 'center'
            }}
          ></Stack>
        ) : (
          <RoutinePercent size={70} routineCardValue={value} />
        )}
      </Box>
    </Link>
  );
}
