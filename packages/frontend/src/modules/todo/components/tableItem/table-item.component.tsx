import React from 'react';
import { TableRow, TableCell } from '@mui/material';
import { ITodo } from '../../types/todo.type';
import { Actions } from '../actions/actions.component';
import { DESC_LENGTH } from '../../consts';

type TableItemProps = {
  todo: ITodo;
};

export const TableItem = ({ todo }: TableItemProps) => (
  <TableRow>
    <TableCell>{todo.name}</TableCell>
    <TableCell>
      {todo.description.length > DESC_LENGTH.MAX
        ? todo.description.substring(DESC_LENGTH.MIN, DESC_LENGTH.MAX)
        : todo.description}
    </TableCell>
    <TableCell>
      <Actions todo={todo} />
    </TableCell>
  </TableRow>
);
