import { Box } from '@mui/material';
import React from 'react';
import { SPACES } from '../../../theme';

type FormProps = {
  children?: React.ReactNode;
  onSubmit?: React.FormEventHandler<HTMLFormElement>;
};

export const Form = ({ children, onSubmit }: FormProps) => (
  <Box
    sx={{ display: 'flex', flexDirection: 'column', gap: SPACES.m }}
    component="form"
    onSubmit={onSubmit}
  >
    {children}
  </Box>
);
