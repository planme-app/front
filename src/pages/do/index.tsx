import React from 'react';
import Head from 'next/head';
import { Stack } from '@mui/material';
import LoginBody from 'components/atoms/LoginBody';
import Header from 'components/organisms/Header';
import TodoPercent from 'components/atoms/TodoPercent';
import { StartStopButton, ResetDeleteButton } from 'components/atoms/DoButton';

export default function Do() {
  return (
    <>
      <Head>
        <title>doing...</title>
      </Head>
      <LoginBody>
        <Header />
        <Stack
          minHeight={'74vh'}
          direction="column"
          alignItems="center"
          sx={{ mt: -4 }}
        >
          <TodoPercent size={300} />
          <StartStopButton />
          <ResetDeleteButton />
        </Stack>
      </LoginBody>
    </>
  );
}
