import React from 'react';
import Head from 'next/head';
import { Stack } from '@mui/material';
import Typography from '@mui/material/Typography';
import LoginBody from 'components/atoms/LoginBody';
import DoHeader from 'components/organisms/DoHeader';
import TodoPercent from 'components/atoms/TodoPercent';
import { StartStopButton, ResetDeleteButton } from 'components/atoms/DoButton';

export default function Do() {
  return (
    <>
      <Head>
        <title>doing...</title>
      </Head>
      <LoginBody>
        <DoHeader />
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
