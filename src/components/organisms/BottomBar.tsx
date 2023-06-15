import React from 'react';
import { useRecoilState } from 'recoil';
import { Stack, Typography } from '@mui/material';
import { mypageState } from 'stores/routines';

export default function BottomBar() {
  const [myPage, setMypage] = useRecoilState(mypageState);
  return (
    <Stack
      sx={{
        position: 'fixed',
        bottom: 50,
        left: '50%',
        maxWidth: '480px',
        width: '100vw',
        height: '70px',
        marginBottom: '10px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'end',
        flexDirection: 'row',
        zIndex: 1000,
        transform: 'translate(-50%, 0)'
      }}
    >
      <Typography
        fontSize={'25px'}
        marginRight={'15px'}
        onClick={() => setMypage(true)}
      >
        ☰
      </Typography>
    </Stack>
  );
}
