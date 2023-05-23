import React from 'react';
import Head from 'next/head';

import { Typography } from '@mui/material';
import MainBody from 'components/atoms/MainBody';
import RoutineTemplateCard from 'components/organisms/RoutineTemplateCard';

export default function RoutineTemplatePage() {
  const routineList = [
    {
      routineName: '팔굽혀',
      imageSrc: '/icon/pushups72.png'
    },
    {
      routineName: '걷기',
      imageSrc: '/icon/pushups72.png'
    },
    {
      routineName: '팔굽혀',
      imageSrc: '/icon/pushups72.png'
    },
    {
      routineName: '걷기',
      imageSrc: '/icon/pushups72.png'
    }
  ];

  const themeList = [
    {
      themeName: '운동',
      routineList: routineList
    },
    {
      themeName: '마음',
      routineList: routineList
    },
    {
      themeName: '공부',
      routineList: routineList
    }
  ];

  return (
    <>
      <Head>
        <title>addpage</title>
      </Head>
      <MainBody>
        <Typography
          sx={{
            display: 'inline',
            fontWeight: 'bold',
            fontSize: 30
          }}
        >
          습관 선택
        </Typography>
        {themeList.map((theme, index) => (
          <RoutineTemplateCard
            routineTheme={theme.themeName}
            routineList={theme.routineList}
            key={index}
          />
        ))}
      </MainBody>
    </>
  );
}
