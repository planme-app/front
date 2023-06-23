import React from 'react';

import { Stack, Typography, InputBase, FormControl } from '@mui/material';
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
  title: string;
  placeholder: string;
  value: string | number;
  setValue: (value: string) => void;
}

export default function RoutineTemplateAddText(
  props: RoutineTemplateAddTextProps
) {
  const { title, placeholder, value, setValue } = props;
  const handleName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
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
        {title}
      </Typography>
      <FormControl>
        <BootstrapInput
          placeholder={placeholder}
          value={value}
          onChange={handleName}
        />
      </FormControl>
    </Stack>
  );
}
