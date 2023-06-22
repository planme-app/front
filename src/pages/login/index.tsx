import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { loginApi } from 'controllers/services/api';
import ModalAtom from 'components/atoms/ModalAtom';

import { checkEmail, checkPw } from 'controllers/domain/User';
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
  Button,
  Typography
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
      if (checkEmail(id) && checkPw(pw)) {
        const result = await loginApi(id, pw);
        if (result.accessToken) {
          router.push('/routine');
          return;
        } else {
          setMessage(result?.message);
        }
      } else {
        setMessage('이메일 또는 비밀번호를 형식에 맞게 입력해주세요');
      }
    } catch (error) {
      console.error(error);
      setMessage('로그인에 실패했습니다. 잠시 후 다시 시도해주세요.');
    }
    if (message) {
      handleOpen();
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
          alignItems="flex-start"
          justifyContent="space-between"
        >
          <Typography
            variant="h3"
            fontWeight={300}
            color={'#556cd6'}
            gutterBottom
          >
            Log in
          </Typography>
        </Stack>

        <Divider sx={{ mb: 5 }}></Divider>

        <Stack spacing={3} sx={{ mb: 3 }}>
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

        {/* 2차 배포 추가 기능
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Checkbox checked={remember} onChange={saveRemeber} /> 
        </Stack>
        */}

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
          {/* 2차 배포 추가 기능
          <Link variant="subtitle2">아이디 찾기</Link>
          <Link variant="subtitle2">비밀번호 찾기</Link>
          */}
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
