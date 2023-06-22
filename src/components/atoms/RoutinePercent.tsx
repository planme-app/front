import React, { useMemo } from 'react';
import Image from 'next/image';
import CircularProgress, {
  CircularProgressProps,
  circularProgressClasses
} from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

interface CircularType {
  size?: number;
  type?: string;
  progress?: number | boolean;
  goal?: number | boolean;
  routineCardValue?: number;
  routineId?: string;
}

function CircularProgressWithLabel(
  props: CircularProgressProps & CircularType
) {
  const { size, type, progress, routineCardValue, goal } = props;

  const routineType = useMemo(() => {
    const getContent = () => {
      if (type === 'bool') {
        const imgSrc = progress ? '/success.png' : '/fail.png';
        return <Image src={imgSrc} width={265} height={265} alt="logo" />;
      }

      if (type === 'time') {
        return typeof progress === 'number'
          ? `${String(Math.floor(progress / 60)).padStart(2, '0')}:${String(
              progress % 60
            ).padStart(2, '0')}`
          : '00:00';
      }
      return progress;
    };

    const getPercent = () => {
      if (typeof progress === 'number' && typeof goal === 'number') {
        return Math.floor((progress / goal) * 100);
      }
      return 0;
    };

    const getValue = () => {
      if (
        typeof progress === 'number' &&
        typeof goal === 'number' &&
        Math.floor((progress / goal) * 100) < 100
      ) {
        return Math.floor((progress / goal) * 100);
      }

      if (typeof progress === 'boolean' && !progress) {
        return 0;
      }
      return 100;
    };

    const content = getContent();
    const percent = getPercent();
    const value = getValue();

    return { content, percent, value };
  }, [type, progress]);

  const cardValueBar = useMemo(() => {
    if (routineCardValue) {
      if (routineCardValue > 100) {
        return 100;
      }
      return routineCardValue;
    }
  }, [routineCardValue]);

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
        color={props.color}
        aria-label={'propsaria - label'}
        size={size || 30}
        thickness={thickness}
        value={
          routineCardValue !== undefined ? cardValueBar : routineType.value
        }
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
        {type === 'bool' ? (
          <>{routineType.content}</>
        ) : (
          <>
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
              {routineCardValue !== undefined
                ? `${routineCardValue}%`
                : `${Math.round(
                    routineType.percent ? routineType.percent : 0
                  )}%`}
            </Typography>
          </>
        )}
      </Box>
    </Box>
  );
}

export default function RoutinePercent(props: CircularType) {
  const { size, type, goal, routineCardValue, routineId, progress } = props;

  return (
    <CircularProgressWithLabel
      size={size}
      type={type}
      goal={goal}
      routineCardValue={routineCardValue}
      routineId={routineId}
      progress={progress}
    />
  );
}
