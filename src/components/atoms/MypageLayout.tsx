import React, { ReactNode } from 'react';
import { styled } from '@mui/material/styles';

interface SlidePanelProps {
  open: boolean;
  children: ReactNode;
}

const MypageSlideLayout = styled('div')<{ open: boolean }>(({ open }) => ({
  maxWidth: 480,
  height: '90vh',
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'column',
  margin: 'auto',
  position: 'fixed',
  transform: open ? 'translateY(0)' : 'translateY(102%)',
  left: 0,
  right: 0,
  bottom: 0,
  zIndex: 1000,
  backgroundColor: '#fff',
  boxShadow: '0 -5px 5px rgba(0, 0, 0, 0.1)',
  borderRadius: '10px',
  transition: 'transform 0.5s ease-in-out'
}));

export default function MypageLayout({ open, children }: SlidePanelProps) {
  return <MypageSlideLayout open={open}>{children}</MypageSlideLayout>;
}
