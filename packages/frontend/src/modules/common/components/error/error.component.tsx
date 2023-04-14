import React from 'react';
import { Typography, Button } from '@mui/material';
import { ModalWindow } from '../modalWindow/modal-window.component';

type ErrorModalProps = {
  isOpen: boolean;
  handleClose: () => void;
  message: string;
};

export const ErrorModal = ({ isOpen, handleClose, message }: ErrorModalProps) => (
  <ModalWindow isOpen={isOpen} handleClose={handleClose}>
    <>
      <Typography variant="body1">{message}</Typography>
      <Button onClick={handleClose}>Close</Button>
    </>
  </ModalWindow>
);
