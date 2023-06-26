import React, { ReactElement } from 'react';
import { Modal } from '@mui/material';

export interface ModalAtomProps {
  open: boolean;
  handleClose: (isOpen: boolean) => void;
  children: ReactElement;
}

export default function ModalAtom(props: ModalAtomProps) {
  const { open, handleClose, children } = props;

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      {children}
    </Modal>
  );
}
