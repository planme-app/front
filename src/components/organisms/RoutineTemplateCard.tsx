import React, { useRef, useEffect } from 'react';

import { styled } from '@mui/material/styles';
import { Typography, Stack } from '@mui/material';
import RoutineTemplate, {
  RoutineTemplateProps
} from 'components/atoms/RoutineTemplate';

const StyledRowScroll = styled('div')(({ theme }) => ({
  msOverflowStyle: 'none', // IE 및 Edge에서 스크롤바 숨김
  scrollbarWidth: 'none', // Firefox에서 스크롤바 숨김
  '&::-webkit-scrollbar': {
    display: 'none' // Chrome 및 Safari에서 스크롤바 숨김
  },
  padding: theme.spacing(1, 0)
}));

type RoutineTemplateCardProps = {
  routineTheme: string;
  routineList: RoutineTemplateProps[];
};

function useHorizontalScroll() {
  const elRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    const el = elRef.current;
    if (el) {
      const onWheel = (e: any) => {
        if (e.deltaY == 0) return;
        e.preventDefault();
        el.scrollTo({
          left: el.scrollLeft + e.deltaY,
          behavior: 'smooth'
        });
      };
      el.addEventListener('wheel', onWheel);
      return () => el.removeEventListener('wheel', onWheel);
    }
  }, []);

  return elRef;
}

export default function RoutineTemplateCard({
  routineTheme,
  routineList
}: RoutineTemplateCardProps) {
  const scrollRef = useHorizontalScroll();

  return (
    <Stack direction="column" sx={{ m: 1 }}>
      <Typography
        sx={{
          fontWeight: 'bold',
          fontSize: 16,
          mb: 1
        }}
      >
        {routineTheme}
      </Typography>
      <StyledRowScroll
        ref={scrollRef}
        style={{
          overflow: 'auto'
        }}
      >
        <Stack direction="row" alignItems="flex-start" spacing={2}>
          {routineList.map((routine, index) => (
            <RoutineTemplate
              routineName={routine.routineName}
              imageSrc={routine.imageSrc}
              key={index}
            />
          ))}
        </Stack>
      </StyledRowScroll>
    </Stack>
  );
}
