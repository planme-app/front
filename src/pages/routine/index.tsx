import React, { useState } from 'react';
import Head from 'next/head';
import { Stack } from '@mui/material';
import LoginBody from 'components/atoms/LoginBody';
import Header from 'components/organisms/Header';
import RoutineCard from 'components/organisms/RoutineCard';
import MypageSlide from 'components/organisms/MypageSlide';

export default function Main() {
  const [mypage, SetMypage] = useState<boolean>(false);
  return (
    <>
      <Head>
        <title>main</title>
      </Head>
      <LoginBody>
        <Header page={'header'} />
        <Stack
          minHeight={'74vh'}
          direction="column"
          alignItems="center"
          sx={{ my: 2 }}
        >
          <RoutineCard />
        </Stack>
        <MypageSlide open={mypage} />
      </LoginBody>
    </>
  );
}
