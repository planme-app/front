import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Image from 'next/image';
import {
  Divider,
  Stack,
  FormControl,
  InputLabel,
  OutlinedInput,
  Button,
  Typography
} from '@mui/material';
import { loginApi } from 'controllers/services/api';
import { checkEmail, checkPw } from 'controllers/domain/User';
import LoginBody from 'components/atoms/LoginBody';
import AlertMessage from 'components/atoms/AlertMessage';
import ModalAtom from 'components/atoms/ModalAtom';
import gogleIcon from 'public/gogleIcon.png';
import kakaoIcon from 'public/kakaoIcon.png';

export default function Login() {
  const router = useRouter();

  const [id, setId] = useState('');
  const [pw, setPw] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  // const [remember, setRemember] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [message, setMessage] = useState('');

  const backPage = () => history.back();

  // const handleClickShowPassword = () => {
  //   setShowPassword((item) => !item);
  // };

  const saveUserId = (e: React.ChangeEvent<HTMLInputElement>) => {
    setId(e.target.value);
  };

  const saveUserPw = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPw(e.target.value);
  };

  // const saveRemeber = () => {
  //   setRemember((item) => !item);
  // };

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
            variant="body1"
            color={'black'}
            onClick={backPage}
            sx={{
              opacity: 0.8,
              mt: -2,
              mb: 3,
              transform: 'scaleY(-1)',
              cursor: 'pointer'
            }}
          >
            ⤶
          </Typography>
          <Typography
            variant="h4"
            fontWeight={700}
            fontFamily="Title_Medium"
            color={'#EA811C'}
            gutterBottom
            sx={{ mb: 4 }}
          >
            로그인
          </Typography>
        </Stack>

        <Stack spacing={3} sx={{ mb: 3 }}>
          <FormControl variant="outlined">
            <InputLabel
              htmlFor="outlined-adornment-ID"
              sx={{ fontWeight: 700 }}
            >
              아이디
            </InputLabel>
            <OutlinedInput
              id="outlined-adornment-ID"
              name="ID"
              value={id}
              onChange={saveUserId}
              label="아이디"
              sx={{
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#E6DFD4',
                  borderWidth: '2px',
                  borderRadius: '5.5px'
                }
              }}
            />
          </FormControl>

          <FormControl variant="outlined">
            <InputLabel
              htmlFor="outlined-adornment-password"
              sx={{ fontWeight: 700 }}
            >
              비밀번호
            </InputLabel>
            <OutlinedInput
              id="outlined-adornment-password"
              value={pw}
              onChange={saveUserPw}
              type={showPassword ? 'text' : 'password'}
              label="비밀번호"
              sx={{
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#E6DFD4',
                  borderWidth: '2px',
                  borderRadius: '5.5px'
                }
              }}
            />
          </FormControl>
        </Stack>

        <Button
          sx={{
            mt: -2,
            mb: 5,
            color: '#a5a2a2',
            fontSize: '11px',
            fontWeight: 500,
            display: 'flex',
            justifyContent: 'flex-start'
          }}
        >
          + 아이디/비밀번호를 잊으셨나요?
        </Button>

        <Button
          variant="contained"
          size="large"
          onClick={moveSignup}
          sx={{ color: 'white', height: '52px', boxShadow: 'none' }}
        >
          회원가입하기
        </Button>

        <Divider
          sx={{
            mt: 5,
            mb: 4,
            bgcolor: 'secondary.light',
            borderBottomWidth: 2
          }}
        />
        <Button
          size="large"
          sx={{ color: '#371C1D', height: '52px', mb: 3, bgcolor: '#F9E000' }}
        >
          <Image src={kakaoIcon} width={35} height={35} alt="gogleIcon" />
          카카오로 시작하기
        </Button>
        <Button
          onClick={handleLogin}
          sx={{
            color: '#371C1D',
            height: '52px',
            bgcolor: 'white',
            border: '2px solid #E6DFD4'
          }}
        >
          <Image src={gogleIcon} width={35} height={35} alt="gogleIcon" />
          구글로 시작하기
        </Button>
      </LoginBody>
      <ModalAtom open={modalOpen} handleClose={handleClose}>
        <AlertMessage title={'error'} message={message} />
      </ModalAtom>
    </>
  );
}
