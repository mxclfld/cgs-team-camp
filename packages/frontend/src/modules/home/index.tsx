import React from 'react';
import { Button, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { PageWrapper } from '../common/components/wrapper/wrapper.component';
import { APP_KEYS } from '../common/consts';

const HomePageContainer = () => (
  <PageWrapper>
    <Typography variant="h3" sx={{ textAlign: 'center' }}>
      Todo App
    </Typography>
    <Button
      type="button"
      variant="contained"
      component={Link}
      to={APP_KEYS.ROUTER_KEYS.LOGIN}
      fullWidth
    >
      Login
    </Button>
    <Button
      type="button"
      variant="contained"
      component={Link}
      to={APP_KEYS.ROUTER_KEYS.REGISTER}
      fullWidth
    >
      Register
    </Button>
    <Button
      type="button"
      sx={{ alignSelf: 'center' }}
      component={Link}
      to={APP_KEYS.ROUTER_KEYS.ROOT}
    >
      Forgot password?
    </Button>
  </PageWrapper>
);

export default HomePageContainer;
