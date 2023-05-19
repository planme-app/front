import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

export default function DoTitle() {
  return (
    <Box
      sx={{
        '& button': { m: 1 },
        width: '200px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column'
      }}
    >
      <Button
        size="small"
        sx={{
          minHeight: '60px',
          fontSize: '25px',
          fontWeight: '700',
          color: 'black'
        }}
      >
        팔굽혀 펴기
      </Button>
      <Typography sx={{ mt: -3, color: '#A4A4A4' }}>오늘</Typography>
    </Box>
  );
}
