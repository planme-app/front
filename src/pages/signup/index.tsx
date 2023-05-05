import React, { useState } from 'react';
import Head from 'next/head';

import { Typography, Divider, Stack, Button } from '@mui/material';

import LoginBody from 'components/atoms/LoginBody';
import TextField from 'components/atoms/TextField';

import {
  checkEmail,
  checkPw,
  checkName,
  confirmPw
} from 'controllers/domain/User';

import { signup } from 'controllers/application/User';

export default function Signup() {
  const [email, setEmail] = useState('');
  const [pw, setPw] = useState('');
  const [twoPw, setTwoPw] = useState('');
  const [name, setName] = useState('');

  const saveUserEmail = (e: string) => {
    setEmail(e);
  };

  const saveUserPw = (e: string) => {
    setPw(e);
  };

  const saveUserCheckPw = (e: string) => {
    setTwoPw(e);
  };

  const saveUserName = (e: string) => {
    setName(e);
  };

  const clickSignup = async () => {
    const res = await signup(email, pw, twoPw, name);
    if (res.result) {
      console.log(res.message);
    } else {
      console.log(res.message);
    }
  };

  return (
    <>
      <Head>
        <title>signup</title>
      </Head>
      <LoginBody>
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
            name="Email"
            password={false}
            tftype={checkEmail(email)}
            message="error"
            value={email}
            onChange={saveUserEmail}
          />
          <TextField
            name="Password"
            password={true}
            tftype={checkPw(pw)}
            message="error"
            value={pw}
            onChange={saveUserPw}
          />
          <TextField
            name="CheckPassword"
            password={true}
            tftype={confirmPw(pw, twoPw)}
            message="error"
            value={twoPw}
            onChange={saveUserCheckPw}
          />
          <TextField
            name="Name"
            password={false}
            tftype={checkName(name)}
            message="error"
            value={name}
            onChange={saveUserName}
          />
        </Stack>

        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          sx={{ my: 1 }}
        ></Stack>

        <Button variant="contained" size="large" onClick={clickSignup}>
          Signup
        </Button>
      </LoginBody>
    </>
  );
}
