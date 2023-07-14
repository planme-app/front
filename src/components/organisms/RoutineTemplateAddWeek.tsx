import React from 'react';
import { Stack, Typography, Button, styled } from '@mui/material';

const CircularButton = styled(Button)({
  borderRadius: '50%',
  width: '40px',
  height: '40px',
  padding: '0',
  minWidth: 'auto',
  boxShadow: 'none',
  '& .MuiButton-label': {
    justifyContent: 'center'
  }
});

export interface RoutineTemplateAddWeekProps {
  dayOfWeek: string[];
  week: boolean[];
  setWeek: (week: boolean[]) => void;
}

export default function RoutineTemplateAddWeek(
  props: RoutineTemplateAddWeekProps
): JSX.Element {
  const { dayOfWeek, week, setWeek } = props;

  const handleWeek = (index: number) => {
    const prevWeek = week;
    prevWeek[index] = !week[index];
    setWeek([...prevWeek]);
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
        빈도
      </Typography>
      <Stack spacing={2} direction="row">
        {week.map((content, index) => {
          return (
            <CircularButton
              id={`day-button-${index}`}
              key={dayOfWeek[index]}
              variant={content ? 'contained' : 'outlined'}
              onClick={() => handleWeek(index)}
            >
              {dayOfWeek[index]}
            </CircularButton>
          );
        })}
      </Stack>
    </Stack>
  );
}
