import React from 'react';
import { Stack } from '@mui/material';
import { CustomButton, Days, DetailTitle } from 'components/atoms/index';

export interface HeaderProps {
  doHeader: boolean;
}

export default function Header({ doHeader }: HeaderProps) {
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
          type="movePrev"
          src={'/movePrev.png'}
          imageWidth={20}
          imageHeight={20}
          alt="moveButton"
        />
        {doHeader ? <DetailTitle /> : <Days />}
        <CustomButton
          type="moveNext_or_SettingDot"
          src={doHeader ? '/settingDot.png' : '/moveNext.png'}
          imageWidth={20}
          imageHeight={20}
          alt="moveButton"
        />
      </Stack>
    </>
  );
}
