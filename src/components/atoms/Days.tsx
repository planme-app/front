import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { useRecoilValue } from 'recoil';
import { routineDate } from 'stores/routines';

export default function Days() {
  const day = useRecoilValue(routineDate);
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
        {String(new Date().getDate()).padStart(2, '0') === day.date.substr(8, 9)
          ? '오늘'
          : day.date.substr(8, 9)}
      </Button>
    </Box>
  );
}
