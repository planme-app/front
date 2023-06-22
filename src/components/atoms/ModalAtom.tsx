import React, { JSXElementConstructor, ReactElement } from 'react';
import Modal from '@mui/material/Modal';

export interface ModalAtomProps {
  open: boolean;
  handleClose: (isOpen: boolean) => void;
  children: ReactElement<any, string | JSXElementConstructor<any>>;
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
