import React, { useMemo } from 'react';
import { Stack } from '@mui/material';
import { useRecoilState } from 'recoil';
import CustomButton from 'components/atoms/CustomButton';
import Days from 'components/atoms/Days';
import DetailTitle from 'components/atoms/DetailTitle';
import { routineDate } from 'stores/routines';
import { routinesApi } from 'controllers/services/api';

export interface HeaderProps {
  page: string;
  userId?: string | null;
}

const year = new Date().getFullYear(); // 년
const month = new Date().getMonth(); // 월
const days = new Date().getDate();

export default function Header({ page, userId }: HeaderProps) {
  const [day, setDay] = useRecoilState(routineDate);

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

    await routinesApi(date, userId);
  };
  console.log(day);
  const pageType = useMemo(() => {
    switch (page) {
      case 'detail':
        return { title: <DetailTitle />, img: '/settingDot.png' };
      case 'routineTemplateAddPage':
        return { title: 'routineTemplateAdd', img: undefined };
      default:
        return {
          title: <Days />,
          img: '/moveNext.png'
        };
    }
  }, [page]);

  return (
    <>
      <Stack
        sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'row',
          zIndex: 1000,
          backgroundColor: '#fff'
        }}
      >
        <CustomButton
          type="movePrev"
          src={'/movePrev.png'}
          imageWidth={20}
          imageHeight={20}
          alt="moveButton"
          onClick={() => (page === 'header' ? moveDate(-1) : null)}
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
    </>
  );
}
