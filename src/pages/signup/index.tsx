import React, { useState } from 'react';
import Head from 'next/head';

import {
  Container,
  Typography,
  Divider,
  Stack,
  TextField,
  Button
} from '@mui/material';

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

export default function Signup() {
  const [id, setId] = useState('');
  const [pw, setPw] = useState('');
  const [checkPw, setCheckPw] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const saveUserId = (e) => {
    setId(e.target.value);
  };

  const saveUserPw = (e) => {
    setPw(e.target.value);
  };

  const saveUserCheckPw = (e) => {
    setCheckPw(e.target.value);
  };

  const saveUserName = (e) => {
    setName(e.target.value);
  };

  const saveUserEmail = (e) => {
    setEmail(e.target.value);
  };

  return (
    <>
      <Head>
        <title>signup</title>
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
                value={id}
                onChange={saveUserId}
              />

              <TextField
                name="Password"
                label="Password"
                value={pw}
                onChange={saveUserPw}
              />

              <TextField
                name="CheckPassword"
                label="CheckPassword"
                value={checkPw}
                onChange={saveUserCheckPw}
              />

              <TextField
                name="Name"
                label="Name"
                value={name}
                onChange={saveUserName}
              />

              <TextField
                name="Email"
                label="Eamil"
                value={email}
                onChange={saveUserEmail}
              />
            </Stack>

            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              sx={{ my: 2 }}
            ></Stack>

            <Button variant="contained" size="large">
              Signup
            </Button>
          </StyledContent>
        </Container>
      </StyledRoot>
    </>
  );
}
