import React from 'react';
import { Stack } from '@mui/material';
import { MoveLeftButton, MoveRightButton } from 'components/atoms/MoveButton';
import DoTitle from 'components/atoms/DoTitle';

export default function DoHeader() {
  return (
    <>
      <Stack
        sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'row',
          zIndex: 1000,
          backgroundColor: '#fff'
        }}
      >
        <MoveLeftButton />
        <DoTitle />
        <MoveRightButton />
      </Stack>
    </>
  );
}
