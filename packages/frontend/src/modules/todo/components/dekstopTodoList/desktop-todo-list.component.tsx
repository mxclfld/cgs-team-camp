import React from 'react';
import {
  Container,
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
  Button
} from '@mui/material';
import { ITodo } from '../../types/todo.type';
import { TableItem } from '../tableItem/table-item.component';
import { SPACES } from '../../../theme';
import { AddTodo } from '../addTodo/add-todo.component';
import { Filter } from '../filter/filter.component';
import { ModalWindow } from '../modalWindow/modal-window.component';

type TodoListProps = {
  todos: ITodo[];
  isOpen: boolean;
  handleOpen: () => void;
  handleClose: () => void;
  handleOpenError: (msg: string) => void;
};

export const DesktopTodoList = ({
  handleOpenError,
  isOpen,
  handleOpen,
  handleClose,
  todos
}: TodoListProps) => (
  <>
    <Container>
      <Filter />
      <Button sx={{ mb: SPACES.l }} type="button" onClick={handleOpen}>
        Add
      </Button>
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
    <ModalWindow isOpen={isOpen} handleClose={handleClose}>
      <AddTodo handleOpenError={handleOpenError} handleClose={handleClose} />
    </ModalWindow>
  </>
);
