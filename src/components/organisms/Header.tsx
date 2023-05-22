import React from 'react';
import { Stack } from '@mui/material';
import { CustomButton } from 'components/atoms/CustomButton';
import Days from 'components/atoms/Days';

export default function Header() {
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
        <CustomButton
          type="moveLeft"
          src={'/moveLeft.png'}
          width={20}
          imageHeight={20}
          alt="moveButton"
        />
        <Days />
        <CustomButton
          type="moveRight"
          src={'/moveRight.png'}
          width={20}
          imageHeight={20}
          alt="moveButton"
        />
      </Stack>
    </>
  );
}
