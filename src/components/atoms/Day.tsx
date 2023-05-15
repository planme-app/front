import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Image from 'next/image';

export default function Day() {
  return (
    <Box sx={{ '& button': { m: 1 } }}>
      <Button size="small">
        <Image src="/moveLeft.png" width={20} height={20} alt="moveButton" />
      </Button>
    </Box>
  );
}
