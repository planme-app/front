import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';

export interface DialogAtomProps {
  items: string[];
  open: boolean;
  selectedItem: string;
  onClose: (value: string) => void;
}

export default function DialogAtom(props: DialogAtomProps) {
  const { onClose, selectedItem, open, items } = props;

  const handleClose = () => {
    onClose(selectedItem);
  };

  const handleListItemClick = (value: string) => {
    onClose(value);
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>Set type</DialogTitle>
      <List sx={{ pt: 0 }}>
        {items.map((item) => (
          <ListItem disableGutters key={item}>
            <ListItemButton onClick={() => handleListItemClick(item)}>
              <ListItemText primary={item} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Dialog>
  );
}
