import React, { useState } from 'react';
import Head from 'next/head';

import {
  Stack,
  Typography,
  InputBase,
  Box,
  FormControl,
  Button
} from '@mui/material';
import { ButtonProps } from '@mui/material/Button';

import { alpha, styled } from '@mui/material/styles';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import MainBody from 'components/atoms/MainBody';
import DialogAtom from '@/components/atoms/DialogAtom';

const BootstrapInput = styled(InputBase)(({ theme }) => ({
  'label + &': {
    marginTop: theme.spacing(3)
  },
  '& .MuiInputBase-input': {
    borderRadius: 4,
    position: 'relative',
    backgroundColor: theme.palette.mode === 'light' ? '#F3F6F9' : '#1A2027',
    // borderColor: theme.palette.mode === 'light' ? '#E0E3E7' : '#2D3843',
    fontSize: 16,
    // width: 'auto',
    padding: '10px 10px 10px 50px',
    transition: theme.transitions.create([
      'border-color',
      'background-color',
      'box-shadow'
    ]),
    '&:focus': {
      boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
      borderColor: theme.palette.primary.main
    }
  }
}));

const ColorButton = styled(Button)<ButtonProps>(({ theme }) => ({
  color: theme.palette.getContrastText('##1A2027'),
  boxShadow: 'none',
  backgroundColor: '#F3F6F9',
  fontSize: 16,
  padding: '8px 10px 8px 50px',
  '&:hover': {
    boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
    backgroundColor: '#F3F6F9'
  }
}));

const types = ['time', 'count'];

export default function AddDetailPage() {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');
  const [selectedValue, setSelectedValue] = useState(types[1]);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value: string) => {
    setOpen(false);
    setSelectedValue(value);
  };

  return (
    <>
      <Head>
        <title>addpage</title>
      </Head>
      <MainBody>
        <Typography
          align="center"
          sx={{
            fontWeight: 'bold',
            fontSize: 30,
            pb: 2
          }}
        >
          습관 선택
        </Typography>
        <Stack sx={{ pb: 3 }}>
          <Typography
            sx={{
              fontWeight: 'bold',
              fontSize: 16,
              pb: 1
            }}
          >
            습관 이름
          </Typography>
          <Box
            component="form"
            noValidate
            sx={{
              display: 'grid',
              gridTemplateColumns: { sm: '1fr 1fr' },
              gap: 2
            }}
          >
            <FormControl variant="standard">
              <BootstrapInput placeholder="습관 이름 입력" value={name} />
            </FormControl>
          </Box>
        </Stack>
        <Stack>
          <Typography
            sx={{
              fontWeight: 'bold',
              fontSize: 16,
              pb: 1
            }}
          >
            타입
          </Typography>
          <ColorButton
            variant="contained"
            endIcon={<ArrowForwardIosIcon sx={{ marginLeft: '200px' }} />}
            onClick={handleClickOpen}
          >
            {selectedValue}
          </ColorButton>
          <DialogAtom
            items={types}
            selectedValue={selectedValue}
            open={open}
            onClose={handleClose}
          />
        </Stack>
      </MainBody>
    </>
  );
}

//575757
