import React, { useState } from 'react';
import { Box, Button, Stack } from '@mui/material';
import { useRecoilState } from 'recoil';
import { routineDate, routineList } from 'stores/routineStore';
import ModalAtom from 'components/atoms/ModalAtom';
import dayjs, { Dayjs } from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { routinesApi } from 'controllers/services/api';

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
  const [, setRoutines] = useRecoilState(routineList);
  const [modalOpen, setModalOpen] = useState(false);
  const [value, setValue] = useState<Dayjs | null>(dayjs(day));
  const today = dayjs().format('YYYY-MM-DD');
  const dayMonth = dayjs(day).format('MM');
  const dayDay = dayjs(day).format('DD');

  const handleOpen = () => setModalOpen(true);
  const handleClose = () => setModalOpen(false);

  const moveDate = async (newValue: Dayjs | null) => {
    if (newValue !== null) {
      setValue(newValue);
      const date = newValue.format('YYYY-MM-DD');
      setDay(date);
      const newRoutineList = await routinesApi(date);
      setRoutines(newRoutineList);
      handleClose();
    }
  };

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
          {day === today ? '오늘' : `${dayMonth}월 ${dayDay}일`}
        </Button>
      </Box>
      <ModalAtom open={modalOpen} handleClose={handleClose}>
        <Stack sx={style}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateCalendar value={value} onChange={moveDate} />
          </LocalizationProvider>
        </Stack>
      </ModalAtom>
    </>
  );
}
