import React, { useState } from 'react';

import { Stack, Typography, Button } from '@mui/material';
import { ButtonProps } from '@mui/material/Button';

import { alpha, styled } from '@mui/material/styles';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import DialogAtom from 'components/atoms/DialogAtom';

const ColorButton = styled(Button)<ButtonProps>(({ theme }) => ({
  color: theme.palette.getContrastText('#999999'),
  boxShadow: 'none',
  backgroundColor: '#F3F6F9',
  fontSize: 16,
  padding: '8px 10px 8px 50px',
  '&:hover': {
    boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
    backgroundColor: '#F3F6F9'
  }
}));

export interface RoutineTemplateAddTypeProps {
  types: string[];
  selectedType: string;
  setSelectedType: (selectedType: string) => void;
}

export default function RoutineTemplateAddType(
  props: RoutineTemplateAddTypeProps
): JSX.Element {
  const { types, selectedType, setSelectedType } = props;

  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value: string) => {
    setOpen(false);
    setSelectedType(value);
  };

  return (
    <Stack>
      <Typography
        sx={{
          fontWeight: 'bold',
          fontSize: 16,
          pb: 1
        }}
      >
        타입
      </Typography>
      <ColorButton
        variant="contained"
        endIcon={<ArrowForwardIosIcon sx={{ marginLeft: '200px' }} />}
        onClick={handleClickOpen}
      >
        {selectedType}
      </ColorButton>
      <DialogAtom
        items={types}
        selectedItem={selectedType}
        open={open}
        onClose={handleClose}
      />
    </Stack>
  );
}
