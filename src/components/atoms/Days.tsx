import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { useRecoilValue } from 'recoil';
import { routineDate } from 'stores/routines';

export default function Days() {
  const day = useRecoilValue(routineDate);
  const dayArr = day.date.split('-');

  const todayYear = String(new Date().getFullYear()).padStart(2, '0');
  const todayMonth = String(new Date().getMonth() + 1).padStart(2, '0');
  const todayDay = String(new Date().getDate()).padStart(2, '0');

  return (
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
      >
        {todayYear === dayArr[0] &&
        todayMonth === dayArr[1] &&
        todayDay === dayArr[2]
          ? '오늘'
          : `${dayArr[1]}월 ${dayArr[2]}일`}
      </Button>
    </Box>
  );
}
