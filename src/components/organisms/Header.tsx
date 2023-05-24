import React, { useMemo } from 'react';
import { Stack } from '@mui/material';
import CustomButton from 'components/atoms/CustomButton';
import Days from 'components/atoms/Days';
import DetailTitle from 'components/atoms/DetailTitle';

export interface HeaderProps {
  page: string;
}

export default function Header({ page }: HeaderProps) {
  const pageType = useMemo(() => {
    switch (page) {
      case 'detail':
        return { title: <DetailTitle />, img: '/settingDot.png' };
      case 'routineTemplateAddPage':
        return { title: 'routineTemplateAdd', img: undefined };
      default:
        return { title: <Days />, img: '/moveNext.png' };
    }
  }, [page]);

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
        {pageType.title}
        <CustomButton
          type="moveNext_or_SettingDot"
          src={pageType.img}
          imageWidth={20}
          imageHeight={20}
          alt="moveButton"
        />
      </Stack>
    </>
  );
}
