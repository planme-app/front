import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { Stack } from '@mui/material';
import LoginBody from 'components/atoms/LoginBody';
import Header from 'components/organisms/Header';
import RoutineCard from 'components/organisms/RoutineCard';
import MypageSlide from 'components/organisms/MypageSlide';
import { useRecoilValueLoadable } from 'recoil';
import { routinesState } from 'stores/routines';

export default function Main() {
  const router = useRouter();

  const [mypage, SetMypage] = useState<boolean>(false);

  const routines = useRecoilValueLoadable(routinesState);

  useEffect(() => {
    const checkLogin = localStorage.getItem('Authorization');
    if (!checkLogin) {
      router.push('/login');
    }
  }, []);

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
