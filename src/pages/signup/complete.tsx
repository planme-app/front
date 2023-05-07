import React from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Image from 'next/image';
import { Typography, Stack, Button } from '@mui/material';
import LoginBody from 'components/atoms/LoginBody';

export default function Complete() {
  const router = useRouter();

  const clickButton = () => {
    router.push('/login');
  };

  return (
    <>
      <Head>
        <title>complete</title>
      </Head>
      <LoginBody>
        <Stack
          direction="column"
          alignItems="center"
          justifyContent="space-between"
        >
          <Image
            src="/check.png"
            width={200}
            height={200}
            alt="complete"
          ></Image>
          <Typography variant="h4" gutterBottom>
            당신이 만드는 습관
          </Typography>
          <Typography variant="h6" gutterBottom>
            회원가입이 완료 되었습니다.
          </Typography>
        </Stack>

        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          sx={{ my: 6 }}
        ></Stack>

        <Button variant="contained" size="large" onClick={clickButton}>
          확인
        </Button>
      </LoginBody>
    </>
  );
}
