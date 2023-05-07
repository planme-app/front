import React, { useState } from 'react';
import Head from 'next/head';

import { Typography, Divider, Stack, Button } from '@mui/material';
import LoginBody from 'components/atoms/LoginBody';
import { signup } from 'controllers/application/User';
import { SignupCard } from 'components/organisms/SignupCard';

export interface TextFieldProps {
  email: {
    value: string;
    onChange: (params: string) => void;
  };
  pw: {
    value: string;
    onChange: (params: string) => void;
  };
  checkPw: {
    value: string;
    onChange: (params: string) => void;
  };
  name: {
    value: string;
    onChange: (params: string) => void;
  };
}

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

  const TextFieldArrayProps: TextFieldProps = {
    email: {
      value: email,
      onChange: saveUserEmail
    },
    pw: {
      value: pw,
      onChange: saveUserPw
    },
    checkPw: {
      value: twoPw,
      onChange: saveUserCheckPw
    },
    name: {
      value: name,
      onChange: saveUserName
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
        <SignupCard data={TextFieldArrayProps}></SignupCard>
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
