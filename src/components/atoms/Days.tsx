import React, { useEffect, useState } from 'react';
import { Box, Button, Stack } from '@mui/material';
import { useRecoilState } from 'recoil';
import { routineDate, routineList } from 'stores/routines';
import ModalAtom from 'components/atoms/ModalAtom';
import dayjs, { Dayjs } from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { routinesApi } from 'controllers/services/api';
import Cookies from 'js-cookie';

const style = {
  position: 'absolute' as const,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'white',
  boxShadow: 24
};

export default function Days() {
  const [day, setDay] = useRecoilState(routineDate);
  const [routines, setRoutines] = useRecoilState(routineList);
  const dayArr = day.date.split('-');
  const [modalOpen, setModalOpen] = useState(false);
  const [value, setValue] = useState<Dayjs | null>(dayjs(day.date));

  const todayYear = String(new Date().getFullYear()).padStart(2, '0');
  const todayMonth = String(new Date().getMonth() + 1).padStart(2, '0');
  const todayDay = String(new Date().getDate()).padStart(2, '0');
  const userId = Cookies.get('userId');

  const handleOpen = () => setModalOpen(true);
  const handleClose = () => setModalOpen(false);

  const moveDate = async (newValue: Dayjs) => {
    setValue(newValue);

    const date = newValue.format('YYYY-MM-DD');

    setDay((prev) => ({
      date: date,
      prevDate: prev.prevDate,
      nextDate: prev.nextDate
    }));

    const newRoutineList = await routinesApi(date, userId);

    setRoutines(newRoutineList);
  };

  useEffect(() => {
    if (value !== null) {
      moveDate(value);
    }
  }, [value]);

  return (
    <>
      <Box
        sx={{
          '& button': { m: 1 },
          width: '230px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <Button
          size="small"
          sx={{
            fontSize: '30px',
            fontWeight: '500',
            color: 'black'
          }}
          onClick={handleOpen}
        >
          {todayYear === dayArr[0] &&
          todayMonth === dayArr[1] &&
          todayDay === dayArr[2]
            ? '오늘'
            : `${dayArr[1]}월 ${dayArr[2]}일`}
        </Button>
      </Box>
      <ModalAtom open={modalOpen} handleClose={handleClose}>
        <Stack sx={style}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateCalendar
              value={value}
              onChange={(newValue) => {
                setValue(newValue);
                handleClose();
              }}
            />
          </LocalizationProvider>
        </Stack>
      </ModalAtom>
    </>
  );
}
