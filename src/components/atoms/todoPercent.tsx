import React, { useState } from 'react';
import CircularProgress, {
  CircularProgressProps,
  circularProgressClasses
} from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';

function CircularProgressWithLabel(
  props: CircularProgressProps & {
    value: number;
    size?: number;
  }
) {
  return (
    <Box sx={{ position: 'relative', display: 'inline-flex' }}>
      <CircularProgress
        variant="determinate"
        sx={{
          color: (theme) =>
            theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800]
        }}
        size={props.size || 30}
        thickness={props.size && props.size > 250 ? 3.5 : 4.5}
        {...props}
        value={100}
      />
      <CircularProgress
        variant="determinate"
        disableShrink
        sx={{
          position: 'absolute',
          left: 0,
          [`& .${circularProgressClasses.circle}`]: {
            strokeLinecap: 'round'
          }
        }}
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
