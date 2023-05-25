import React, { PropsWithChildren } from 'react';
import { Container } from '@mui/material';
import { styled } from '@mui/material/styles';

interface StyledLoginBodyProps {
  flexDirection?: 'row' | 'column';
  minHeight?: string;
  backgroundColor?: string;
}

const StyledRoot = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex'
  }
}));

const StyledContent = styled('div')<StyledLoginBodyProps>(
  ({ theme, flexDirection = 'column' }) => ({
    maxWidth: 480,
    margin: 'auto',
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    flexDirection: flexDirection,
    padding: theme.spacing(12, 0)
  })
);

export default function LoginBody({
  children,
  flexDirection
}: PropsWithChildren<StyledLoginBodyProps>) {
  return (
    <StyledRoot>
      <Container maxWidth="sm">
        <StyledContent flexDirection={flexDirection}>{children}</StyledContent>
      </Container>
    </StyledRoot>
  );
}
