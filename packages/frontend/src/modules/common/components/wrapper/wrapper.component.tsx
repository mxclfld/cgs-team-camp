import React from 'react';
import { Box, Container, ContainerProps, SxProps, Theme } from '@mui/material';
import { SPACES, SIZES } from '../../../theme';
import { useDevice } from '../../hooks/useDevice';

export const PageWrapper = ({ children }: ContainerProps) => {
  const device = useDevice();
  const style: SxProps<Theme> = {
    width: SIZES.CONTAINER_WIDTH[device]
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh'
      }}
    >
      <Container
        sx={{
          ...style,
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
          gap: SPACES.l
        }}
      >
        {children}
      </Container>
    </Box>
  );
};
