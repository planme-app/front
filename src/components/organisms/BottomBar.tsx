import React from 'react';
import { useRouter } from 'next/router';
import HomeIcon from '@mui/icons-material/Home';
import AddBoxIcon from '@mui/icons-material/AddBox';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { BottomNavigation, BottomNavigationAction, Paper } from '@mui/material';

interface State {
  state: number;
}

export default function BottomBar({ state }: State) {
  const router = useRouter();

  const goRoutine = () => {
    router.push('/routine');
  };

  const goTemplate = () => {
    router.push('/routine/template');
  };

  const goProfile = () => {
    router.push('/profile');
  };

  return (
    <Paper
      sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }}
      elevation={3}
    >
      <BottomNavigation showLabels value={state}>
        <BottomNavigationAction
          label="Home"
          icon={<HomeIcon />}
          onClick={goRoutine}
        />
        <BottomNavigationAction
          id="add-routine-button"
          label="Add"
          icon={<AddBoxIcon />}
          onClick={goTemplate}
        />
        <BottomNavigationAction
          label="Profile"
          icon={<AccountCircleIcon />}
          onClick={goProfile}
        />
      </BottomNavigation>
    </Paper>
  );
}
