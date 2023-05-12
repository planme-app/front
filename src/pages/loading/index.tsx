import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { ThreeDots } from 'react-loader-spinner';
import Head from 'next/head';
import Image from 'next/image';
import { Typography, Stack } from '@mui/material';
import LoginBody from 'components/atoms/LoginBody';

export default function Loading() {
  const router = useRouter();

  // useEffect(() => {
  //   const findToken = localStorage.getItem('Authorization');
  //   if (findToken) {
  //     router.push('/');
  //   } else {
  //     router.push('/login');
  //   }
  // }, []);

  return (
    <>
      <Head>
        <title>complete</title>
      </Head>
      <LoginBody>
        <Stack
          direction="column"
          alignItems="center"
          justifyContent="center"
          sx={{ my: 6 }}
        >
          <Image src="/logo2.png" width={265} height={35} alt="logo"></Image>
          <ThreeDots height="70" width="40" color="gray" ariaLabel="loading" />
          <Typography
            mt={'-25px'}
            variant="body2"
            fontWeight={800}
            color={'gray'}
            gutterBottom
          >
            로딩중..
          </Typography>
        </Stack>

        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          sx={{ my: 6 }}
        ></Stack>
      </LoginBody>
    </>
  );
}
