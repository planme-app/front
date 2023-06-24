import React, { useMemo } from 'react';
import { useRouter } from 'next/router';
import { useRecoilState } from 'recoil';
import { routineDate, routineList } from 'stores/routineStore';
import { Stack } from '@mui/material';
import { usePutRoutine } from 'controllers/application/PutRoutine';
import { routinesApi } from 'controllers/services/api';
import CustomButton from 'components/atoms/CustomButton';
import Days from 'components/atoms/Days';
import DetailTitle from 'components/atoms/DetailTitle';
import dayjs from 'dayjs';

export interface HeaderProps {
  page: string;
  title?: string;
  routineId?: string;
}

export default function Header({ page, title, routineId }: HeaderProps) {
  const router = useRouter();
  const [day, setDay] = useRecoilState(routineDate);
  const [routines, setRoutines] = useRecoilState(routineList);
  const { putRoutine } = usePutRoutine();
  const nextDay = dayjs().add(1, 'd').format('YYYY-MM-DD');

  const moveDate = async (offset: number) => {
    const date = dayjs(day).add(offset, 'd').format('YYYY-MM-DD');
    setDay(date);

    try {
      const newRoutineList = await routinesApi(date);
      setRoutines(newRoutineList);
    } catch (error) {
      console.error('Failed to fetch routine list:', error);
    }
  };

  const prevPage = async () => {
    if (routineId) {
      const routine = routines.find(
        (list) => list.routine_instance_id === routineId
      );
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
      router.push('/routine');
    }
  };

  const pageType = useMemo(() => {
    switch (page) {
      case 'detail':
        return { title: <DetailTitle title={title} />, img: '/settingDot.png' };
      case 'routineTemplateAddPage':
        return { title: 'routineTemplateAdd', img: undefined };
      default:
        return {
          title: <Days />,
          img: '/moveNext.png'
        };
    }
  }, [page, title]);

  return (
    <Stack
      sx={{
        position: 'fixed',
        top: 0,
        left: '50%',
        maxWidth: '480px',
        width: '100vw',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        zIndex: 1000,
        transform: 'translate(-50%, 0)',
        backgroundColor: 'white'
      }}
    >
      <CustomButton
        type="movePrev"
        src={'/movePrev.png'}
        imageWidth={20}
        imageHeight={20}
        alt="moveButton"
        onClick={() => (page === 'header' ? moveDate(-1) : prevPage())}
      />
      {pageType.title}
      {day === nextDay ? (
        <CustomButton disabled={true} />
      ) : (
        <CustomButton
          type="moveNext_or_SettingDot"
          src={pageType.img}
          imageWidth={20}
          imageHeight={20}
          alt="moveButton"
          onClick={() => (page === 'header' ? moveDate(1) : null)}
        />
      )}
    </Stack>
  );
}
