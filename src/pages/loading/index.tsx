import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { Oval } from 'react-loader-spinner';
import Head from 'next/head';
import Image from 'next/image';
import { Typography, Stack } from '@mui/material';
import LoginBody from 'components/atoms/LoginBody';

export default function Loading() {
  const router = useRouter();

  // useEffect(() => {
  //   const checkLogin = localStorage.getItem('Authorization');
  //   if (checkLogin) {
  //     router.push('/');
  //   } else {
  //     router.push('/login');
  //   }
  // }, []);

  return (
    <>
      <Head>
        <title>loading...</title>
      </Head>
      <LoginBody>
        <Stack
          direction="column"
          alignItems="center"
          justifyContent="center"
          sx={{ my: 6 }}
        >
          <Image src="/logo2.png" width={265} height={35} alt="logo"></Image>
          <Oval
            height={30}
            width={30}
            color="#556cd6"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
            ariaLabel="oval-loading"
            secondaryColor="#556cd6"
            strokeWidth={2}
            strokeWidthSecondary={2}
          />
          <Typography
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
