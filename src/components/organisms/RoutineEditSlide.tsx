import React from 'react';
import { useSetRecoilState } from 'recoil';
import { routineEditState, editType } from 'stores/routineStore';
import { Box, Button, Typography } from '@mui/material';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

export default function RoutineEditSlide({ open }: { open: boolean }) {
  const setRoutineDeleteState = useSetRecoilState(routineEditState);

  const openDeleteSlide = () => {
    setRoutineDeleteState((prev: editType) => {
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
          height: '30vh',
          borderRadius: '10px',
          backgroundColor: 'white',
          flexDirection: 'column',
          position: 'absolute',
          left: ' 50%',
          bottom: 0,
          transform: open ? 'translate(-50%,-5%)' : 'translate(-50%,-15%)',
          transition: 'transform 1s ease',
          boxShadow: ' 0 4px 10px rgba(0, 0, 0, 0.1)'
        }}
      >
        <Typography fontWeight={700} sx={{ my: 2, ml: 3 }}>
          루틴 설정
        </Typography>
        <Button
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
