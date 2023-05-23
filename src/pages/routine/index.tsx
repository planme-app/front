import React, { useState } from 'react';
import Head from 'next/head';
import { Stack } from '@mui/material';
import LoginBody from 'components/atoms/LoginBody';
import Header from 'components/organisms/Header';
import TodoCard from 'components/organisms/TodoCard';
import MypageSlide from 'components/organisms/MypageSlide';

export default function Main() {
  const [mypage, SetMypage] = useState<boolean>(false);
  return (
    <>
      <Head>
        <title>main</title>
      </Head>
      <LoginBody>
        <Header doHeader={false} />
        <Stack
          minHeight={'74vh'}
          direction="column"
          alignItems="center"
          sx={{ my: 2 }}
        >
          <TodoCard />
        </Stack>
        <MypageSlide open={mypage} />
      </LoginBody>
    </>
  );
}
