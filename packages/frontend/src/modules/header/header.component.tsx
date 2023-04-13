import React from 'react';
import { Button, Container } from '@mui/material';
import { Link } from 'react-router-dom';
import { APP_KEYS } from '../common/consts';
import { SPACES } from '../theme';

export const Header = () => (
  <Container sx={{ display: 'flex', justifyContent: 'space-between', mb: SPACES.l }}>
    <Button type="button" component={Link} to={APP_KEYS.ROUTER_KEYS.TODOS_LIST}>
      Todo List
    </Button>
    <Button type="button" component={Link} to={APP_KEYS.ROUTER_KEYS.PROFILE}>
      My Profile
    </Button>
  </Container>
);
