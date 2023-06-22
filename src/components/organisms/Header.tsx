import React, { useMemo } from 'react';
import { useRouter } from 'next/router';
import { Stack } from '@mui/material';
import { useRecoilState } from 'recoil';
import CustomButton from 'components/atoms/CustomButton';
import Days from 'components/atoms/Days';
import DetailTitle from 'components/atoms/DetailTitle';
import { routineDate, routineList } from 'stores/routines';
import { routinesApi } from 'controllers/services/api';

export interface HeaderProps {
  page: string;
  userId?: string | null;
  title?: string;
}

const year = new Date().getFullYear(); // 년
const month = new Date().getMonth(); // 월
const days = new Date().getDate();

export default function Header({ page, userId, title }: HeaderProps) {
  const router = useRouter();
  const [day, setDay] = useRecoilState(routineDate);
  const [routines, setRoutines] = useRecoilState(routineList);

  const moveDate = async (offset: number) => {
    const offsetForDate = offset > 0 ? day.nextDate : day.prevDate;
    const newDate = new Date(year, month, days + offsetForDate);

    const date = `${newDate.getFullYear()}-${String(
      newDate.getMonth() + 1
    ).padStart(2, '0')}-${String(newDate.getDate()).padStart(2, '0')}`;

    setDay((prev) => ({
      date: date,
      prevDate: prev.prevDate + offset,
      nextDate: prev.nextDate + offset
    }));

    const newRoutineList = await routinesApi(date, userId);
    console.log(newRoutineList);

    setRoutines(newRoutineList);
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
        onClick={() =>
          page === 'header' ? moveDate(-1) : router.push('/routine')
        }
      />
      {pageType.title}
      <CustomButton
        type="moveNext_or_SettingDot"
        src={pageType.img}
        imageWidth={20}
        imageHeight={20}
        alt="moveButton"
        onClick={() => (page === 'header' ? moveDate(1) : null)}
      />
    </Stack>
  );
}
