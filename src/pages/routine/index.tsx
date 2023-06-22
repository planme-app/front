import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { GetServerSideProps } from 'next';
import { Stack, Typography } from '@mui/material';
import LoginBody from 'components/atoms/LoginBody';
import Header from 'components/organisms/Header';
import RoutineCard from 'components/organisms/RoutineCard';
import MypageSlide from 'components/organisms/MypageSlide';
import BottomBar from 'components/organisms/BottomBar';
import { routinesApi } from 'controllers/services/api';
import { useRecoilValue, useRecoilState } from 'recoil';
import { mypageState, routineList, RoutineType } from 'stores/routineStore';

interface MyInfoType {
  userEmail: string | null;
  userName: string | null;
}
interface MainProps {
  initialRoutines: RoutineType[];
  userId: string | null;
  myInfo: MyInfoType;
  routineDates: string;
}

export default function Main({
  initialRoutines,
  userId,
  myInfo,
  routineDates
}: MainProps) {
  const [showSkeleton, setShowSkeleton] = useState(false);
  const [mypageInfo, setMypageInfo] = useState<MyInfoType>(myInfo);
  const mypage = useRecoilValue<boolean>(mypageState);

  const [routines, setRoutines] = useRecoilState(routineList);

  useEffect(() => {
    if (!routines.length) {
      setRoutines(initialRoutines);
    } else {
      const fetchRoutines = async () => {
        try {
          const fetchedRoutines = await routinesApi(routineDates, userId);
          setRoutines(fetchedRoutines);
        } catch (error) {
          console.error('Error fetching routines:', error);
        }
      };
      fetchRoutines();
    }
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!routines.length) {
        setShowSkeleton(true);
      }
    }, 5000);

    return () => clearTimeout(timer);
  }, [routines]);

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
          // display="center"
          // justifyContent="center"
          alignItems="center"
          sx={{ my: 2 }}
        >
          {routines.length ? (
            routines?.map((list) => {
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
          ) : showSkeleton ? (
            <Typography fontWeight={600} marginTop="25vh">
              루틴이 아직 없어요..
              <br /> 루틴을 추가해볼까요?! 🙌
            </Typography>
          ) : (
            Array.from({ length: 5 }).map((_, index) => (
              <RoutineCard key={index} />
            ))
          )}
        </Stack>
        <BottomBar />
        <MypageSlide
          open={mypage}
          email={mypageInfo.userEmail}
          name={mypageInfo.userName}
        />
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
      userId,
      myInfo,
      routineDates
    }
  };
};
