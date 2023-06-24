import React from 'react';
import { useRecoilState } from 'recoil';
import { routineList } from 'stores/routineStore';
import { Box, Stack, styled } from '@mui/material';
import CustomButton from 'components/atoms/CustomButton';

interface CountType {
  routineId: string;
  goal: number;
}

const StyledStack = styled(Stack)(() => ({
  width: '80vw',
  maxWidth: '480px',
  height: '70px',
  flexDirection: 'row'
}));

const ButtonData = [
  { id: 1, label: '10' },
  { id: 2, label: '20' },
  { id: 3, label: '30' },
  { id: 4, label: '40' }
];

export default function RoutineDetailCountButton({ routineId }: CountType) {
  const [routines, setRoutines] = useRecoilState(routineList);

  const plusCount = (cnt: number) => {
    setRoutines(
      routines.map((prev) =>
        prev.routine_instance_id === routineId &&
        typeof prev.progress === 'number'
          ? { ...prev, progress: prev.progress + cnt }
          : prev
      )
    );
  };

  const buttons = (startIndex: number, endIndex: number) => {
    return ButtonData.slice(startIndex, endIndex).map((button) => (
      <CustomButton
        key={button.id}
        width="100px"
        height="40px"
        display="center"
        justifyContent="center"
        backgroundColor="#556cd6"
        color="white"
        borderRadius="5px"
        m="auto"
        onClick={() => plusCount(Number(button.label))}
      >
        {button.label}
      </CustomButton>
    ));
  };

  return (
    <Box
      sx={{
        maxWidth: '480px',
        width: '100vw',
        height: '330px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        backgroundColor: 'white'
      }}
    >
      <StyledStack>{buttons(0, 2)}</StyledStack>
      <StyledStack>{buttons(2, 4)}</StyledStack>
    </Box>
  );
}
