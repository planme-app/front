import React from 'react';
import { useRouter } from 'next/router';
import { useSetRecoilState } from 'recoil';
import { routineEditState, EditType } from 'stores/routineStore';
import { Box, Button, Typography } from '@mui/material';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

export default function RoutineEditSlide({
  open,
  routineId
}: {
  open: boolean;
  routineId: string;
}) {
  const router = useRouter();
  const setRoutineDeleteState = useSetRecoilState(routineEditState);

  const moveEditPage = () => {
    router.push(`/edit/${routineId}`);
  };

  const openDeleteSlide = () => {
    setRoutineDeleteState((prev: EditType) => {
      return {
        editSlide: !prev.editSlide,
        deleteSlide: !prev.deleteSlide
      };
    });
  };
  return (
    <>
      <Box
        sx={{
          width: '90vw',
          maxWidth: '480px',
          height: '25vh',
          borderRadius: '10px',
          backgroundColor: 'white',
          flexDirection: 'column',
          position: 'absolute',
          left: ' 50%',
          bottom: open ? '5%' : '-30%',
          transform: 'translate(-50%,0)',
          transition: 'transform 1s ease',
          boxShadow: ' 0 4px 10px rgba(0, 0, 0, 0.1)'
        }}
      >
        <Typography fontWeight={700} sx={{ my: 2, ml: 3 }}>
          루틴 설정
        </Typography>
        <Button
          onClick={moveEditPage}
          sx={{
            width: '70vw',
            maxWidth: '400px',
            height: '50px',
            display: 'flex',
            justifyContent: 'space-between',
            m: 'auto',
            color: 'gray'
          }}
        >
          루틴 수정
          <ArrowForwardIosIcon />
        </Button>
        <Button
          onClick={openDeleteSlide}
          sx={{
            width: '70vw',
            maxWidth: '400px',
            height: '50px',
            display: 'flex',
            justifyContent: 'space-between',
            m: 'auto',
            color: 'red'
          }}
        >
          루틴 삭제
          <ArrowForwardIosIcon />
        </Button>
      </Box>
    </>
  );
}
