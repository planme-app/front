import React, { useEffect, useMemo, useState } from 'react';
import { useRecoilValue, useRecoilState } from 'recoil';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import { Stack } from '@mui/material';
import { routineList, RoutineType } from 'stores/routines';
import {
  timerState,
  timeStateRecoil,
  boolStateRecoil
} from 'stores/routineDetailType';
import Header from 'components/organisms/Header';
import RoutinePercent from 'components/atoms/RoutinePercent';
import LoginBody from 'components/atoms/LoginBody';
import RoutineDetailCountButton from 'components/organisms/RoutineDetailCountButton';
import RoutineDetailBoolButton from 'components/organisms/RoutineDetailBoolButton';
import RoutineDetailTimeButton from 'components/organisms/RoutineDetailTimeButton';

export default function Do({ routineId }: { routineId: string }) {
  const [routine, setRoutine] = useState<RoutineType>();
  const routines = useRecoilValue(routineList);
  const running = useRecoilValue(timerState);
  const [recoilTime, setRecoilTime] = useRecoilState(timeStateRecoil);

  const routineType = useMemo(() => {
    switch (routine?.type) {
      case 'bool':
        return {
          buttonStyle: <RoutineDetailTimeButton running={running} />
        };
      case 'count':
        return { buttonStyle: <RoutineDetailCountButton /> };
      default:
        return {
          buttonStyle: <RoutineDetailBoolButton />
        };
    }
  }, [running]);

  useEffect(() => {
    const foundRoutine = routines.find(
      (list) => list.routine_instance_id === routineId
    );
    if (foundRoutine) {
      setRoutine(foundRoutine);
      if (
        foundRoutine.type === 'time' &&
        typeof foundRoutine.progress === 'number' &&
        typeof foundRoutine.goal === 'number'
      ) {
        setRecoilTime({
          ...recoilTime,
          goal: foundRoutine.goal,
          progress: foundRoutine.progress
        });
      }
    }
  }, [routines]);

  return (
    <>
      <Head>
        <title>doing...</title>
      </Head>
      <LoginBody>
        <Header page={'detail'} />
        <Stack minHeight={'74vh'} direction="column" alignItems="center">
          <RoutinePercent
            size={300}
            type={routine ? routine.type : 'time'}
            progress={routine ? routine.progress : 0}
            goal={routine ? routine.goal : 100}
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
