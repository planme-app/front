import React, { useEffect } from 'react';
import Head from 'next/head';
import { GetServerSideProps } from 'next';
import { Stack } from '@mui/material';
import LoginBody from 'components/atoms/LoginBody';
import Header from 'components/organisms/Header';
import RoutineCard from 'components/organisms/RoutineCard';
import BottomBar from 'components/organisms/BottomBar';
import { routinesApi } from 'controllers/services/api';
import { useRecoilState } from 'recoil';
import { routineList, RoutineType } from 'stores/routines';

interface MyInfoType {
  userEmail: string | null;
  userName: string | null;
}
interface MainProps {
  initialRoutines: RoutineType[];
  userId: string | null;
  myInfo: MyInfoType;
}

export default function Main({ initialRoutines, userId }: MainProps) {
  const [routines, setRoutines] = useRecoilState(routineList);

  useEffect(() => {
    if (!routines.length) {
      setRoutines(initialRoutines);
    }
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
          {routines.length
            ? routines?.map((list) => {
                return (
                  <RoutineCard
                    key={list.routine_instance_id}
                    routineId={list.routine_instance_id}
                    routineTitle={list.title}
                    routineDays={list.days_of_week}
                    cardProgress={list.progress}
                    cardGoal={list.goal}
                  />
                );
              })
            : Array.from({ length: 5 }).map((_, index) => (
                <RoutineCard key={index} />
              ))}
        </Stack>
        <BottomBar state={0} />
      </LoginBody>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const cookie = context.req.headers.cookie;
  const parsedCookie: Record<string, string> = {};

  if (cookie) {
    const cookieArray = cookie.split(';');
    cookieArray.forEach((cookiePair) => {
      const [key, value] = cookiePair.trim().split('=');
      parsedCookie[key] = value;
    });
  }

  const { Authorization, userEmail, userName, userId } = parsedCookie;

  if (!Authorization) {
    context.res.writeHead(302, { Location: '/login' });
    context.res.end();
  }

  const routineDates = `${new Date().getFullYear()}-${String(
    new Date().getMonth() + 1
  ).padStart(2, '0')}-${String(new Date().getDate()).padStart(2, '0')}`;
  const routines = await routinesApi(routineDates, userId);

  const myInfo =
    Authorization && userEmail && userName
      ? { userEmail, userName }
      : undefined;

  return {
    props: {
      initialRoutines: routines,
      userId: userId,
      myInfo: myInfo
    }
  };
};
