import React, { useEffect, useMemo, useState } from 'react';
import { useRecoilValue, useRecoilState } from 'recoil';

import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import Head from 'next/head';

import { Stack } from '@mui/material';

import { routineList, RoutineType, timerState } from 'stores/routineStore';

import { usePutRoutine } from 'controllers/application/PutRoutine';

import RoutinePercent from 'components/atoms/RoutinePercent';
import LoginBody from 'components/atoms/LoginBody';

import Header from 'components/organisms/Header';
import RoutineDetailCountButton from 'components/organisms/RoutineDetailCountButton';
import RoutineDetailBoolButton from 'components/organisms/RoutineDetailBoolButton';
import RoutineDetailTimeButton from 'components/organisms/RoutineDetailTimeButton';

export default function Do({ routineId }: { routineId: string }) {
  const router = useRouter();
  const [routine, setRoutine] = useState<RoutineType>();
  const [routines, setRoutines] = useRecoilState(routineList);
  const running = useRecoilValue(timerState);
  const foundRoutine = routines.find(
    (list) => list.routine_instance_id === routineId
  );
  const { putRoutine } = usePutRoutine();

  const routineType = useMemo(() => {
    switch (routine?.type) {
      case 'bool':
        return {
          buttonStyle: <RoutineDetailBoolButton routineId={routineId} />
        };
      case 'count':
        return {
          buttonStyle: (
            <RoutineDetailCountButton
              routineId={routineId}
              goal={typeof routine.goal === 'number' ? routine.goal : 100}
            />
          )
        };
      default:
        return {
          buttonStyle: (
            <RoutineDetailTimeButton routineId={routineId} running={running} />
          )
        };
    }
  }, [running, routine]);

  useEffect(() => {
    const sessionRoutine = sessionStorage.getItem('routine');
    if (foundRoutine) {
      setRoutine(foundRoutine);
    } else if (sessionRoutine) {
      const routineFromSession = JSON.parse(sessionRoutine).find(
        (list: RoutineType) => list.routine_instance_id === routineId
      );
      if (routine?.progress !== routineFromSession.progress) {
        setRoutine(routineFromSession);
        setRoutines([routineFromSession]);
      }
    } else {
      router.push('/routine');
    }
  }, [routines, routine]);

  useEffect(() => {
    const handlePopState = async () => {
      if (routine && routine.progress) {
        const type = routine.type;
        const progress = routine.progress;
        try {
          await putRoutine(routineId, type, progress);
        } catch (error) {
          console.error('Routine 업데이트 실패: ');
        }
      }
      sessionStorage.removeItem('routine');
    };
    window.addEventListener('popstate', handlePopState);
    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, [routine]);

  useEffect(() => {
    const saveRoutinesSession = () => {
      if (!sessionStorage.getItem('routine')) {
        sessionStorage.setItem('routine', JSON.stringify(routines));
      }
    };
    window.addEventListener('beforeunload', saveRoutinesSession);
    return () => {
      window.removeEventListener('beforeunload', saveRoutinesSession);
    };
  }, [routines]);

  return (
    <>
      <Head>
        <title>doing...</title>
      </Head>
      <LoginBody>
        <Header page={'detail'} title={routine?.title} routineId={routineId} />
        <Stack minHeight={'74vh'} direction="column" alignItems="center">
          <RoutinePercent
            size={300}
            type={routine ? routine.type : 'time'}
            progress={routine ? routine.progress : 0}
            goal={routine ? routine.goal : 100}
            routineId={routine?.routine_instance_id}
          />
          {routineType.buttonStyle}
        </Stack>
      </LoginBody>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const routineId = context.params!.routinedetail as string;
  return {
    props: {
      routineId
    }
  };
};
