import React, { ReactElement } from 'react';
import { Modal } from '@mui/material';

export interface ModalAtomProps {
  open: boolean;
  handleClose: (isOpen: boolean) => void;
  children: ReactElement;
  id?: string;
}

export default function ModalAtom(props: ModalAtomProps) {
  const { open, handleClose, children, id } = props;

  return (
    <Modal
      id={id}
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      {children}
    </Modal>
  );
}
