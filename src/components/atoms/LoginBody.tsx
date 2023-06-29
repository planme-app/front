import React, { PropsWithChildren } from 'react';
import { Container, styled } from '@mui/material';

interface StyledLoginBodyProps {
  flexDirection?: 'row' | 'column';
  minHeight?: string;
  backgroundColor?: string;
  paddingTop?: number;
}

const StyledRoot = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex'
  }
}));

const StyledContent = styled('div')<StyledLoginBodyProps>(
  ({ theme, flexDirection = 'column', paddingTop = 5 }) => ({
    maxWidth: 480,
    margin: 'auto',
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    flexDirection: flexDirection,
    padding: theme.spacing(12, 0),
    paddingTop: theme.spacing(paddingTop)
  })
);

export default function LoginBody({
  children,
  flexDirection,
  paddingTop
}: PropsWithChildren<StyledLoginBodyProps>) {
  return (
    <StyledRoot>
      <Container maxWidth="sm">
        <StyledContent flexDirection={flexDirection} paddingTop={paddingTop}>
          {children}
        </StyledContent>
      </Container>
    </StyledRoot>
  );
}
