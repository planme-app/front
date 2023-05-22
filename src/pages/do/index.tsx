import React from 'react';
import Head from 'next/head';
import { Stack } from '@mui/material';
import LoginBody from 'components/atoms/LoginBody';
import Header from 'components/organisms/Header';
import TodoPercent from 'components/atoms/TodoPercent';
import { CustomButton } from 'components/atoms/CustomButton';

export default function Do() {
  return (
    <>
      <Head>
        <title>doing...</title>
      </Head>
      <LoginBody>
        <Header />
        <Stack minHeight={'74vh'} direction="column" alignItems="center">
          <TodoPercent size={300} />
          <CustomButton
            type="startStop"
            display="flex"
            borderRadius="10px"
            backgroundColor="#556cd6"
            mt={15}
            px={4}
            height="35px"
            color="#fff"
          >
            일시정지
          </CustomButton>
          <CustomButton
            type="resetDelete"
            display="flex"
            borderRadius="10px"
            backgroundColor="#ACB3BF"
            mt={4}
            px={1}
            height="30px"
            color="#fff"
          >
            Reset
          </CustomButton>
        </Stack>
      </LoginBody>
    </>
  );
}
