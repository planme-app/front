import React, { useState } from 'react';
import {
  Button,
  ButtonProps,
  Stack,
  Typography,
  alpha,
  styled
} from '@mui/material';
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
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = (value: string) => {
    console.log(value);
    setOpen(false);
    setSelectedType(value);
  };

  return (
    <Stack sx={{ pb: 3 }}>
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
        onClick={handleOpen}
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
