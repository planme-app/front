import React, { useMemo } from 'react';
import { useRecoilValue } from 'recoil';
import CircularProgress, {
  CircularProgressProps,
  circularProgressClasses
} from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { timeStateRecoil } from 'stores/routineDetailType';

interface CircularType {
  size?: number;
  type?: string;
  progress?: number | boolean;
  goal?: number | boolean;
}

function CircularProgressWithLabel(
  props: CircularProgressProps & CircularType
) {
  const { size, type, progress, goal } = props;

  const value = useRecoilValue(timeStateRecoil);

  const routineType = useMemo(() => {
    switch (type) {
      case 'bool':
        return { content: progress };
      case 'time':
        return {
          content: value.time
        };
      default:
        return { content: progress };
    }
  }, [type, progress, value.time]);

  const thickness = size && size > 250 ? 3.5 : 4.5;

  return (
    <Box sx={{ position: 'relative', display: 'inline-flex' }}>
      <CircularProgress
        variant="determinate"
        sx={{
          color: (theme) =>
            theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800]
        }}
        size={size || 30}
        thickness={thickness}
        value={100}
      />
      <CircularProgress
        variant="determinate"
        sx={{
          position: 'absolute',
          left: 0,
          [`& .${circularProgressClasses.circle}`]: {
            strokeLinecap: 'round'
          }
        }}
        size={size || 30}
        thickness={thickness}
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
          justifyContent: 'center',
          flexDirection: 'column'
        }}
      >
        {size && size > 200 ? (
          <Typography
            variant={size ? 'h4' : 'overline'}
            component="div"
            color="black"
            fontWeight="bold"
          >
            {`${routineType.content}`}
          </Typography>
        ) : null}

        <Typography
          variant={size ? 'body2' : 'overline'}
          component="div"
          color={size && size > 200 ? '#9C9C9C' : 'black'}
          fontWeight="bold"
        >
          {`${Math.round(value.percent)}%`}
        </Typography>
      </Box>
    </Box>
  );
}

export default function RoutinePercent(props: CircularType) {
  const { size, type = 'time' } = props;

  return <CircularProgressWithLabel size={size} type={type} />;
}
