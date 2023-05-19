import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

export function MypageLogoutButton() {
  return (
    <Box
      display={'flex'}
      borderRadius={'10px'}
      sx={{
        backgroundColor: '#FC5C5C',
        mt: 15,
        px: 4,
        height: '35px',
        position: 'absolute',
        bottom: '150px'
      }}
    >
      <Button size="small" sx={{ width: '240px', color: '#fff' }}>
        로그아웃
      </Button>
    </Box>
  );
}
