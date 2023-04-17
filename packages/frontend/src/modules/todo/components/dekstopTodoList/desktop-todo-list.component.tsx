import React from 'react';
import {
  Container,
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableBody,
  TableCell
} from '@mui/material';
import { ITodo } from '../../types/todo.type';
import { TableItem } from '../tableItem/table-item.component';

type TodoListProps = {
  todos: ITodo[];
};

export const DesktopTodoList = ({ todos }: TodoListProps) => (
  <Container>
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Title</TableCell>
            <TableCell>Description</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {todos.map((todo) => (
            <TableItem key={todo.id} todo={todo} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  </Container>
);
