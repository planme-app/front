import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { Stack } from '@mui/material';
import LoginBody from 'components/atoms/LoginBody';
import Header from 'components/organisms/Header';
import RoutineCard from 'components/organisms/RoutineCard';
import MypageSlide from 'components/organisms/MypageSlide';
import { routinesApi } from 'controllers/services/api';
import { useRecoilValue, useRecoilState } from 'recoil';
import { routineDate, routineList } from 'stores/routines';

export default function Main() {
  const router = useRouter();
  const [mypageInfo, setMypageInfo] = useState<{
    email: string | null;
    name: string | null;
  }>({
    email: '',
    name: ''
  });

  const [mypage, setMypage] = useState<boolean>(false);

  const routineDates = useRecoilValue(routineDate);
  const [routines, setRoutines] = useRecoilState(routineList);

  useEffect(() => {
    if (!localStorage.getItem('Authorization')) {
      router.push('/login');
    } else {
      const email = localStorage.getItem('userEmail');
      const name = localStorage.getItem('userName');
      setMypageInfo({ email: email, name: name });
    }
  }, []);

  useEffect(() => {
    const routineFetch = async () => {
      const routine = await routinesApi(routineDates.date);
      if (routine.length) {
        setRoutines(routine);
      }
    };
    routineFetch();
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
        <MypageSlide
          open={mypage}
          email={mypageInfo.email}
          name={mypageInfo.name}
        />
      </LoginBody>
    </>
  );
}
