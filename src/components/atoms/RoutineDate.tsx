import React, { useState } from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

export default function RoutineDate({
  routineDays
}: {
  routineDays?: string[];
}) {
  const [days, setDays] = useState<string[]>([
    '일',
    '월',
    '화',
    '수',
    '목',
    '금',
    '토'
  ]);

  return (
    <Box sx={{ paddingTop: '10px' }}>
      {days.map((day, index) => (
        <Typography
          key={index}
          variant="body1"
          component="span"
          sx={{
            fontSize: routineDays?.includes(day) ? '12px' : '10px',
            fontWeight: routineDays?.includes(day) ? 'bold' : 'normal',
            color: routineDays?.includes(day) ? 'black' : '#B6B6B6',
            ml: 0.2
          }}
        >
          {day}
        </Typography>
      ))}
    </Box>
  );
}
