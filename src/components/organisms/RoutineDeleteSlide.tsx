import React from 'react';
import { useSetRecoilState } from 'recoil';
import { routineEditState } from 'stores/routineStore';
import { Box, Button, Typography, Stack } from '@mui/material';

export default function RoutineDeleteSlide({ open }: { open: boolean }) {
  const setRoutineDeleteSlide = useSetRecoilState(routineEditState);

  const cancleSlide = () => {
    setRoutineDeleteSlide({ editSlide: false, deleteSlide: false });
  };
  return (
    <>
      <Box
        onClick={cancleSlide}
        sx={{
          width: '100vw',
          height: '100vh',
          backgroundColor: open ? 'rgba(0, 0, 0, 0.6)' : 'rgba(0, 0, 0, 0)',
          position: 'absolute',
          top: 0,
          left: 0,
          zIndex: 9995,
          transition: 'all 1s ease'
        }}
      />
      <Box
        sx={{
          width: '100vw',
          maxWidth: '480px',
          height: '45vh',
          borderRadius: '10px',
          backgroundColor: 'white',
          position: 'absolute',
          zIndex: 9999,
          left: ' 50%',
          bottom: 0,
          transform: open ? 'translate(-50%,-5%)' : 'translate(-50%,100%)',
          transition: 'all 1s ease',
          boxShadow: ' 0 -4px 10px rgba(0, 0, 0, 0.1)'
        }}
      >
        <Typography fontWeight={700} align="center" sx={{ my: 4 }}>
          좋은 습관이에요
          <br />
          정말로 그만하시겠어요?
        </Typography>
        <Typography fontWeight={700} align="center" sx={{ mt: 5 }}>
          루틴: 걷기
          <br />
          진행 일수: 280일
          <br />
          성공: 220일
        </Typography>

        <Stack flexDirection="row" sx={{ mt: 5 }}>
          <Button
            onClick={cancleSlide}
            sx={{
              width: '120px',
              height: '40px',
              m: 'auto',
              backgroundColor: '#666666',
              color: 'white'
            }}
          >
            취소
          </Button>
          <Button
            sx={{
              width: '120px',
              height: '40px',
              m: 'auto',
              backgroundColor: '#FC5C5C',
              color: 'white'
            }}
          >
            확인
          </Button>
        </Stack>
      </Box>
    </>
  );
}
