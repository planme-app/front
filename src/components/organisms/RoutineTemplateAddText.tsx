import React from 'react';

import { Stack, Typography, InputBase, Box, FormControl } from '@mui/material';
import { alpha, styled } from '@mui/material/styles';

const BootstrapInput = styled(InputBase)(({ theme }) => ({
  'label + &': {
    marginTop: theme.spacing(3)
  },
  '& .MuiInputBase-input': {
    borderRadius: 4,
    position: 'relative',
    backgroundColor: theme.palette.mode === 'light' ? '#F3F6F9' : '#1A2027',
    fontSize: 16,
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

export interface RoutineTemplateAddTextProps {
  name: string;
  setName: (name: string) => void;
}

export default function RoutineTemplateAddText(
  props: RoutineTemplateAddTextProps
) {
  const { name, setName } = props;
  const nameChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  return (
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
          <BootstrapInput
            placeholder="습관 이름 입력"
            value={name}
            onChange={nameChangeHandler}
          />
        </FormControl>
      </Box>
    </Stack>
  );
}
