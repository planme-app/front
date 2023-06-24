import * as React from 'react';
import {
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  DialogTitle,
  Dialog
} from '@mui/material';

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
