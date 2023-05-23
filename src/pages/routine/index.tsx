import React, { useState } from 'react';
import Head from 'next/head';
import { Stack } from '@mui/material';
import LoginBody from 'components/atoms/LoginBody';
import { Header, RoutineCard, MypageSlide } from 'components/organisms/index';

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
