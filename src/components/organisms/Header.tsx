import React, { useMemo } from 'react';
import { useRecoilState } from 'recoil';

import { useRouter } from 'next/router';

import { Stack } from '@mui/material';

import CustomButton from 'components/atoms/CustomButton';
import Days from 'components/atoms/Days';
import DetailTitle from 'components/atoms/DetailTitle';

import { routineDate, routineList } from 'stores/routineStore';

import { usePutRoutine } from 'controllers/application/PutRoutine';
import { routinesApi } from 'controllers/services/api';

export interface HeaderProps {
  page: string;
  userId?: string | null;
  title?: string;
  routineId?: string;
}

const year = new Date().getFullYear(); // 년
const month = new Date().getMonth(); // 월
const days = new Date().getDate();

export default function Header({
  page,
  userId,
  title,
  routineId
}: HeaderProps) {
  const router = useRouter();
  const [day, setDay] = useRecoilState(routineDate);
  const [routines, setRoutines] = useRecoilState(routineList);
  const { putRoutine } = usePutRoutine();

  const moveDate = async (offset: number) => {
    const nowDate = new Date(day.date);
    const newDate = new Date(nowDate.setDate(nowDate.getDate() + offset));

    const date = `${newDate.getFullYear()}-${String(
      newDate.getMonth() + 1
    ).padStart(2, '0')}-${String(newDate.getDate()).padStart(2, '0')}`;

    setDay((prev) => ({
      ...prev,
      date: date,
      prevDate: prev.prevDate + offset,
      nextDate: prev.nextDate + offset
    }));

    try {
      const newRoutineList = await routinesApi(date, userId);
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
      {Number(day.date.split('-')[2]) === day.today + 1 ? (
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
