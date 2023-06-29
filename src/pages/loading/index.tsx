import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Image from 'next/image';
import { Box } from '@mui/material';
import Cookies from 'js-cookie';

export default function Loading() {
  const router = useRouter();

  useEffect(() => {
    const checkLogin = Cookies.get('Authorization');
    if (checkLogin) {
      router.push('/routine');
    } else {
      router.push('/login');
    }
  }, [router]);

  return (
    <>
      <Head>
        <title>loading...</title>
      </Head>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          minHeight: '100vh'
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            bottom: '50%'
          }}
        >
          <Image
            src="/Logo(titleO).png"
            width={110}
            height={110}
            alt="logo"
          ></Image>
        </Box>
        <Box
          sx={{
            position: 'absolute',
            bottom: '10%'
          }}
        >
          <Image src="/SubTitle.png" width={90} height={15} alt="logo"></Image>
        </Box>
      </Box>
    </>
  );
}
