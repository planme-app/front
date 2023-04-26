import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';

import {
  Link,
  Container,
  Typography,
  Divider,
  Stack,
  TextField,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  IconButton,
  Checkbox,
  Button
} from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

import { styled } from '@mui/material/styles';

const StyledRoot = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex'
  }
}));

const StyledContent = styled('div')(({ theme }) => ({
  maxWidth: 480,
  margin: 'auto',
  minHeight: '100vh',
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  padding: theme.spacing(12, 0)
}));

export default function Login() {
  const router = useRouter();

  const [idValue, setId] = useState('');
  const [pwValue, setPw] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberValue, setRemember] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword((show) => !show);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const saveUserId = (e) => {
    setId(e.target.value);
  };

  const saveUserPw = (e) => {
    setPw(e.target.value);
  };

  const saveRemeber = () => {
    setRemember((remeber) => !remeber);
  };

  const moveSignup = () => {
    router.push('/signup');
  };

  return (
    <>
      <Head>
        <title>Login</title>
      </Head>
      <StyledRoot>
        <Container maxWidth="sm">
          <StyledContent>
            <Stack
              direction="column"
              alignItems="center"
              justifyContent="space-between"
            >
              <Typography variant="h4" gutterBottom>
                Self Management
              </Typography>
            </Stack>

            <Divider sx={{ my: 3 }}></Divider>

            <Stack spacing={3}>
              <TextField
                name="ID"
                label="ID"
                value={idValue}
                onChange={saveUserId}
              />

              <FormControl sx={{ m: 1 }} variant="outlined">
                <InputLabel htmlFor="outlined-adornment-password">
                  Password
                </InputLabel>
                <OutlinedInput
                  id="outlined-adornment-password"
                  value={pwValue}
                  onChange={saveUserPw}
                  type={showPassword ? 'text' : 'password'}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                  label="Password"
                />
              </FormControl>
            </Stack>

            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
            >
              <Checkbox
                name="remember"
                label="Remember me"
                checked={rememberValue}
                onChange={saveRemeber}
              />
            </Stack>

            <Button variant="contained" size="large">
              Login
            </Button>
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              sx={{ my: 2 }}
            >
              <Link variant="subtitle2" href="/signup" onClick={moveSignup}>
                회원가입
              </Link>
              <Link variant="subtitle2">아이디 찾기</Link>
              <Link variant="subtitle2">비밀번호 찾기</Link>
            </Stack>
          </StyledContent>
        </Container>
      </StyledRoot>
    </>
  );
}
