import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Image from 'next/image';

export function MoveLeftButton() {
  return (
    <Box>
      <Button size="small">
        <Image src="/moveLeft.png" width={20} height={20} alt="moveButton" />
      </Button>
    </Box>
  );
}

export function MoveRightButton() {
  return (
    <Box>
      <Button size="small">
        <Image src="/moveRight.png" width={20} height={20} alt="moveButton" />
      </Button>
    </Box>
  );
}
