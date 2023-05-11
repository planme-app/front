import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Image from 'next/image';
import { loginApi } from 'controllers/services/api';
import ModalAtom from 'components/atoms/ModalAtom';

import {
  Link,
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
import LoginBody from 'components/atoms/LoginBody';

export default function Login() {
  const router = useRouter();

  const [id, setId] = useState('');
  const [pw, setPw] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [message, setMessage] = useState('');

  const handleClickShowPassword = () => {
    setShowPassword((item) => !item);
  };

  const saveUserId = (e: React.ChangeEvent<HTMLInputElement>) => {
    setId(e.target.value);
  };

  const saveUserPw = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPw(e.target.value);
  };

  const saveRemeber = () => {
    setRemember((item) => !item);
  };

  const moveSignup = () => {
    router.push('/signup');
  };

  const handleOpen = () => setModalOpen(true);
  const handleClose = () => setModalOpen(false);

  const handleLogin = async () => {
    try {
      const result = await loginApi(id, pw);

      if (result.accessToken) {
        router.push('/');
      } else {
        setMessage(result?.message);
        handleOpen();
      }
    } catch (error) {
      console.error(error);
      console.log('Login failed');
    }
  };

  return (
    <>
      <Head>
        <title>Login</title>
      </Head>
      <LoginBody>
        <Stack
          direction="column"
          alignItems="center"
          justifyContent="space-between"
        >
          <Image src="/logo2.png" width={305} height={35} alt="logo"></Image>
        </Stack>

        <Divider sx={{ my: 3 }}></Divider>

        <Stack spacing={3}>
          <TextField name="ID" label="ID" value={id} onChange={saveUserId} />

          <FormControl sx={{ m: 1 }} variant="outlined">
            <InputLabel htmlFor="outlined-adornment-password">
              Password
            </InputLabel>
            <OutlinedInput
              id="outlined-adornment-password"
              value={pw}
              onChange={saveUserPw}
              type={showPassword ? 'text' : 'password'}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
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
          <Checkbox checked={remember} onChange={saveRemeber} />
        </Stack>

        <Button variant="contained" size="large" onClick={handleLogin}>
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
      </LoginBody>
      <ModalAtom
        open={modalOpen}
        handleClose={handleClose}
        title={'error'}
        message={message}
      />
    </>
  );
}
