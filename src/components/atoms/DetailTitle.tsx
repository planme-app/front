import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import dayjs from 'dayjs';
import { useRecoilValue } from 'recoil';
import { routineDate } from '@/stores/routineStore';

export default function DetailTitle({ title }: { title?: string }) {
  const day = useRecoilValue(routineDate);
  const today = dayjs().format('YYYY-MM-DD');
  const dayMonth = dayjs(day).format('MM');
  const dayDay = dayjs(day).format('DD');

  return (
    <Box
      sx={{
        '& button': { m: 1 },
        width: '230px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column'
      }}
    >
      <Typography
        sx={{
          fontSize: '25px',
          fontWeight: '700',
          color: 'black',
          mt: 1.5
        }}
      >
        {title}
      </Typography>
      <Typography sx={{ mt: -0.5, color: '#A4A4A4' }}>
        {day === today ? '오늘' : `${dayMonth}월 ${dayDay}일`}
      </Typography>
    </Box>
  );
}
