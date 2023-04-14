import React from 'react';
import { Modal, Box, Paper } from '@mui/material';
import { SIZES, SPACES } from '../../../theme';
import { useDevice } from '../../hooks/useDevice';

type ModalProps = {
  isOpen: boolean;
  handleClose: () => void;
  children: JSX.Element;
};

export const ModalWindow = ({ isOpen, handleClose, children }: ModalProps) => {
  const device = useDevice();

  return (
    <Modal
      open={isOpen}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          width: SIZES.MODAL_WIDTH[device],
          transform: 'translate(-50%, -50%)',
          padding: SPACES.l
        }}
        component={Paper}
      >
        {children}
      </Box>
    </Modal>
  );
};
