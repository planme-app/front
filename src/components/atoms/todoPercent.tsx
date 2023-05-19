import React, { useState } from 'react';
import CircularProgress, {
  CircularProgressProps
} from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';

// 트랙 색상을 변경한 사용자 정의 CircularProgress 컴포넌트
const CustomCircularProgress = styled(CircularProgress)`
  & .MuiCircularProgress-circle {
    stroke-linecap: round;
  }
`;

function CircularProgressWithLabel(
  props: CircularProgressProps & {
    value: number;
    size?: number;
  }
) {
  return (
    <Box sx={{ position: 'relative', display: 'inline-flex' }}>
      <CustomCircularProgress
        variant="determinate"
        size={props.size || 30}
        thickness={props.size && props.size > 250 ? 3.5 : 4.5}
        {...props}
      />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: 'absolute',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <Typography
          variant={props.size ? 'h6' : 'overline'}
          component="div"
          color="black"
          fontWeight="bold"
        >{`${Math.round(props.value)}%`}</Typography>
      </Box>
    </Box>
  );
}

export default function TodoPercent({ size }: { size?: number }) {
  const [progress, setProgress] = useState<number>(40);

  return <CircularProgressWithLabel size={size} value={progress} />;
}
