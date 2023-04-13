import React from 'react';
import { Box, Button, ButtonGroup, SxProps, TextField, Theme } from '@mui/material';
import { SPACES } from '../../../theme';
import { useDevice } from '../../../common/hooks/useDevice';

// TODO: make filter workable
export const Filter = () => {
  const device = useDevice();
  const style: SxProps<Theme> =
    device === 'mobile'
      ? { display: 'flex', flexDirection: 'column', mt: SPACES.l, mb: SPACES.l, gap: SPACES.s }
      : { display: 'flex', justifyContent: 'space-between', mt: SPACES.l, mb: SPACES.l };

  return (
    <Box sx={style}>
      <ButtonGroup size="small" variant="outlined" aria-label="outlined button group">
        <Button>All</Button>
        <Button>Private</Button>
        <Button>Public</Button>
        <Button>Completed</Button>
      </ButtonGroup>
      <TextField placeholder="Search..." />
    </Box>
  );
};
