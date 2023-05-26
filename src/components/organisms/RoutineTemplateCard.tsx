import React, { useRef, useEffect } from 'react';

import { styled } from '@mui/material/styles';
import { Typography, Stack } from '@mui/material';
import RoutineTemplate from 'components/atoms/RoutineTemplate';
import { Template } from '@/controllers/Entity/Template';

const StyledRowScroll = styled('div')(({ theme }) => ({
  msOverflowStyle: 'none', // IE 및 Edge에서 스크롤바 숨김
  scrollbarWidth: 'none', // Firefox에서 스크롤바 숨김
  '&::-webkit-scrollbar': {
    display: 'none' // Chrome 및 Safari에서 스크롤바 숨김
  },
  padding: theme.spacing(1, 0)
}));

const useHorizontalScroll = () => {
  const elRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    const el = elRef.current;
    if (el) {
      const onWheel = (e: WheelEvent) => {
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
};

export interface RoutineTemplateCardProps {
  routineTheme: string;
  routineList: Template[] | [];
}

export default function RoutineTemplateCard(props: RoutineTemplateCardProps) {
  const { routineTheme, routineList } = props;

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
          {routineList?.map((routine) => (
            <RoutineTemplate
              title={routine.title}
              logoUrl={routine.logoUrl}
              key={routine.routineTemplateId}
            />
          ))}
        </Stack>
      </StyledRowScroll>
    </Stack>
  );
}
