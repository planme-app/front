import React from 'react';
import { BottomNavigation, BottomNavigationAction, Paper } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import AddBoxIcon from '@mui/icons-material/AddBox';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useRouter } from 'next/router';

interface State {
  state: number;
}

export default function BottomBar({ state }: State) {
  const router = useRouter();

  return (
    <Paper
      sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }}
      elevation={3}
    >
      <BottomNavigation showLabels value={state}>
        <BottomNavigationAction
          label="Home"
          icon={<HomeIcon />}
          onClick={() => router.push('/routine')}
        />
        <BottomNavigationAction
          label="Add"
          icon={<AddBoxIcon />}
          onClick={() => router.push('/routine/template')}
        />
        <BottomNavigationAction
          label="Profile"
          icon={<AccountCircleIcon />}
          onClick={() => router.push('/profile')}
        />
      </BottomNavigation>
    </Paper>
  );
}
