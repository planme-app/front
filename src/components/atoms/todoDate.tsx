import React, { useState } from 'react';
import Typography from '@mui/material/Typography';

export default function TodoDate() {
  const [days, setDays] = useState<string[]>([
    '월',
    '화',
    '수',
    '목',
    '금',
    '토',
    '일'
  ]);
  //예시를 위한 상태입니다.
  const boldDays = ['월', '수', '금', '일'];

  return (
    <div>
      {days.map((day, index) => (
        <Typography
          key={index}
          variant="body1"
          component="span"
          sx={{
            fontSize: boldDays.includes(day) ? '14px' : '11px',
            fontWeight: boldDays.includes(day) ? 'bold' : 'normal',
            marginRight: 0.1
          }}
        >
          {day}
        </Typography>
      ))}
    </div>
  );
}
