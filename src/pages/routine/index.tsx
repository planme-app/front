import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { Stack } from '@mui/material';
import LoginBody from 'components/atoms/LoginBody';
import Header from 'components/organisms/Header';
import RoutineCard from 'components/organisms/RoutineCard';
import MypageSlide from 'components/organisms/MypageSlide';
import { routinesApi } from 'controllers/services/api';
import { useRecoilValue, useRecoilState } from 'recoil';
import { routineDate, routineList, RoutineType } from 'stores/routines';

interface MyInfoType {
  email: string | null;
  name: string | null;
}
interface MainProps {
  initialRoutines: RoutineType[];
  userId: string | null;
  myInfo: MyInfoType;
}

export default function Main({ initialRoutines, userId, myInfo }: MainProps) {
  const router = useRouter();
  const [mypageInfo, setMypageInfo] = useState<MyInfoType>(myInfo);

  const [mypage, setMypage] = useState<boolean>(false);

  const routineDates = useRecoilValue(routineDate);
  const [routines, setRoutines] = useRecoilState(routineList);

  useEffect(() => {
    setRoutines(initialRoutines);
  }, []);

  return (
    <>
      <Head>
        <title>main</title>
      </Head>
      <LoginBody>
        <Header page={'header'} userId={userId} />
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

export const getServerSideProps: GetServerSideProps = async (context) => {
  const cookie = context.req.headers.cookie;

  if (!cookie) {
    context.res.writeHead(302, { Location: '/login' });
    context.res.end();
  }

  const routineDates = `${new Date().getFullYear()}-${String(
    new Date().getMonth() + 1
  ).padStart(2, '0')}-${String(new Date().getDate()).padStart(2, '0')}`;

  const parsedCookie: Record<string, string> = {};

  if (cookie) {
    const cookieArray = cookie.split(';');
    cookieArray.forEach((cookiePair) => {
      const [key, value] = cookiePair.trim().split('=');
      parsedCookie[key] = value;
    });
  }

  const { Authorization, userEmail, userName, userId } = parsedCookie;
  const routines = await routinesApi(routineDates, userId);

  const myInfo =
    Authorization && userEmail && userName
      ? { userEmail, userName }
      : undefined;

  return {
    props: {
      initialRoutines: routines,
      userId: userId,
      myInfo: myInfo || undefined
    }
  };
};
