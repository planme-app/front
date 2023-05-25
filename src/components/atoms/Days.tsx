import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

export default function Days() {
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
        오늘
      </Button>
    </Box>
  );
}
