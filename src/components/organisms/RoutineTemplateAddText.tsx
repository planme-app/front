import React from 'react';
import {
  Stack,
  Typography,
  InputBase,
  FormControl,
  alpha,
  styled
} from '@mui/material';

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
  type: string;
  title: string;
  placeholder: string;
  value: string | number;
  dataCy?: string;
  setValue: (value: string) => void;
}

export default function RoutineTemplateAddText(
  props: RoutineTemplateAddTextProps
) {
  const { type, title, placeholder, value, dataCy, setValue } = props;
  const handleName = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (type === 'number') {
      const numValue = e.target.value;
      const isValid = /^[1-9]\d*$/.test(numValue); // 정규식을 사용하여 숫자 검사

      if (numValue === '' || isValid) {
        setValue(numValue === '' ? '' : `${parseInt(numValue, 10)}`); // 숫자로 변환하여 상태 업데이트
      }
    } else {
      setValue(e.target.value);
    }
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
          id={dataCy}
          placeholder={placeholder}
          value={value}
          onChange={handleName}
        />
      </FormControl>
    </Stack>
  );
}
