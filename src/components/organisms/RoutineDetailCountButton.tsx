import React from 'react';
import { styled } from '@mui/material/styles';
import { Box, Stack } from '@mui/material';
import CustomButton from 'components/atoms/CustomButton';

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
    >
      {button.label}
    </CustomButton>
  ));
};

export default function RoutineDetailCountButton() {
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
