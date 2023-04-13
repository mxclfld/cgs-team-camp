import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import { ITodo } from '../../types/todo.type';
import { Actions } from '../actions/actions.component';
import { DESC_LENGTH } from '../../consts';
import { SPACES } from '../../../theme';

type CardItemProps = {
  todo: ITodo;
};

export const CardItem = ({ todo }: CardItemProps) => (
  <Card sx={{ mb: SPACES.l }}>
    <CardContent>
      <Typography variant="h6">{todo.name}</Typography>
      <Typography variant="body1">
        {todo.description.length > DESC_LENGTH.MAX
          ? todo.description.substring(DESC_LENGTH.MIN, DESC_LENGTH.MAX)
          : todo.description}
      </Typography>
      <Actions todo={todo} />
    </CardContent>
  </Card>
);
