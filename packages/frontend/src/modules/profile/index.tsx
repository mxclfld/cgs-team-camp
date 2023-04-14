import React from 'react';
import { Button, Typography } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { PageWrapper } from '../common/components/wrapper/wrapper.component';
import { APP_KEYS } from '../common/consts';

const ProfilePageContainer = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem(APP_KEYS.STORAGE_KEYS.TOKEN);
    navigate(APP_KEYS.ROUTER_KEYS.ROOT);
  };

  return (
    <PageWrapper>
      <Typography variant="h3" sx={{ textAlign: 'center' }}>
        Profile
      </Typography>
      <Button
        type="button"
        variant="contained"
        component={Link}
        to={APP_KEYS.ROUTER_KEYS.CHANGE_PASSWORD}
        fullWidth
      >
        Change password
      </Button>
      <Button onClick={handleLogout} type="button" variant="contained" fullWidth>
        Logout
      </Button>
      <Button
        type="button"
        variant="contained"
        fullWidth
        component={Link}
        to={APP_KEYS.ROUTER_KEYS.TODOS_LIST}
      >
        Back
      </Button>
    </PageWrapper>
  );
};

export default ProfilePageContainer;
