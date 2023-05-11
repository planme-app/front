import React, { PropsWithChildren } from 'react';
import { Container } from '@mui/material';
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

export default function LoginBody({ children }: PropsWithChildren) {
  return (
    <StyledRoot>
      <Container maxWidth="sm">
        <StyledContent>{children}</StyledContent>
      </Container>
    </StyledRoot>
  );
}
