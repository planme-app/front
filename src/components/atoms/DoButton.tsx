import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

export function StartStopButton() {
  return (
    <Box
      display={'flex'}
      borderRadius={'10px'}
      sx={{ backgroundColor: '#556cd6', mt: 15, px: 4, height: '35px' }}
    >
      <Button size="small" sx={{ color: '#fff' }}>
        일시정지
      </Button>
    </Box>
  );
}

export function ResetDeleteButton() {
  return (
    <Box
      display={'flex'}
      borderRadius={'10px'}
      sx={{ backgroundColor: '#ACB3BF', my: 4, px: 1, height: '30px' }}
    >
      <Button size="small" sx={{ color: '#fff' }}>
        Reset
      </Button>
    </Box>
  );
}
