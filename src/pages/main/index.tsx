import React from 'react';
import Head from 'next/head';
import { Stack } from '@mui/material';
import LoginBody from 'components/atoms/LoginBody';
import Header from 'components/organisms/Header';
import TodoCard from 'components/organisms/TodoCard';

export default function Main() {
  return (
    <>
      <Head>
        <title>main</title>
      </Head>
      <LoginBody>
        <Header />
        <Stack
          minHeight={'74vh'}
          direction="column"
          alignItems="center"
          sx={{ my: 2 }}
        >
          <TodoCard />
        </Stack>
      </LoginBody>
    </>
  );
}
