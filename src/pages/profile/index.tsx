import React from 'react';
import { useRouter } from 'next/router';
import { Box, Button, Stack } from '@mui/material';
import MainBody from 'components/atoms/MainBody';
import BottomBar from 'components/organisms/BottomBar';
import Cookies from 'js-cookie';

export default function Profile() {
  const router = useRouter();
  const userEmail = Cookies.get('userEmail');
  const userName = Cookies.get('userName');

  const logout = () => {
    Cookies.remove('Authorization');
    Cookies.remove('userId');
    Cookies.remove('userName');
    Cookies.remove('userEmail');
    router.push('/login');
  };

  return (
    <MainBody>
      <Stack sx={{ pb: 3 }}>
        <Box
          sx={{
            borderRadius: 4,
            position: 'relative',
            backgroundColor: '#F3F6F9',
            fontSize: 16,
            textAlign: 'center'
          }}
        >
          <p>{userEmail}</p>
        </Box>
      </Stack>
      <Stack sx={{ pb: 3 }}>
        <Box
          sx={{
            borderRadius: 4,
            position: 'relative',
            backgroundColor: '#F3F6F9',
            fontSize: 16,
            textAlign: 'center'
          }}
        >
          <p>{userName}</p>
        </Box>
      </Stack>
      <Button
        id="logout-button"
        variant="contained"
        color="error"
        onClick={logout}
        size="large"
      >
        로그아웃
      </Button>
      <BottomBar state={2} />
    </MainBody>
  );
}
