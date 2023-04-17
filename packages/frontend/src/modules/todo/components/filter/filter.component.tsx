import React from 'react';
import { Box, Button, ButtonGroup, SxProps, TextField, Theme } from '@mui/material';
import { SPACES } from '../../../theme';
import { useDevice } from '../../../common/hooks/useDevice';
import { DeviceEnum } from '../../../common/types/device.types';

type FilterProps = {
  search: string;
  setSearch: (value: string) => void;
  setStatus: (value: string) => void;
};

export const Filter = ({ search, setSearch, setStatus }: FilterProps) => {
  const device = useDevice();
  const style: SxProps<Theme> =
    device !== DeviceEnum.DESKTOP
      ? { display: 'flex', flexDirection: 'column', mt: SPACES.l, mb: SPACES.l, gap: SPACES.s }
      : { display: 'flex', justifyContent: 'space-between', mt: SPACES.l, mb: SPACES.l };

  const handleGetAllTodos = () => setStatus('');
  const handleGetPrivateTodos = () => setStatus('private');
  const handleGetPublicTodos = () => setStatus('public');
  const handleGetCompleteTodos = () => setStatus('completed');

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  return (
    <Box sx={style}>
      <ButtonGroup size="small" variant="outlined" aria-label="outlined button group">
        <Button onClick={handleGetAllTodos}>All</Button>
        <Button onClick={handleGetPrivateTodos}>Private</Button>
        <Button onClick={handleGetPublicTodos}>Public</Button>
        <Button onClick={handleGetCompleteTodos}>Completed</Button>
      </ButtonGroup>

      <TextField value={search} onChange={handleSearch} placeholder="Search..." />
    </Box>
  );
};
