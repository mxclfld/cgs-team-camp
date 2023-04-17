import React, { useEffect } from 'react';
import { Container, Button, Box } from '@mui/material';
import { SPACES } from '../../../theme';
import { ITodo } from '../../types/todo.type';
import { AddTodo } from '../addTodo/add-todo.component';
import { CardItem } from '../cardItem/card-item.component';
import { ModalWindow } from '../../../common/components/modalWindow/modal-window.component';

type TodoListProps = {
  todos: ITodo[];
  isOpen: boolean;
  handleOpen: () => void;
  handleClose: () => void;
  handleOpenError: (msg: string) => void;
  handleScroll: () => void;
};

export const MobileTodoList = ({
  todos,
  isOpen,
  handleOpen,
  handleClose,
  handleOpenError,
  handleScroll
}: TodoListProps) => {
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <Container>
        <Button sx={{ mb: SPACES.l }} type="button" onClick={handleOpen}>
          Add
        </Button>
        <Box>
          {todos.map((todo) => (
            <CardItem key={todo.id} todo={todo} />
          ))}
        </Box>
      </Container>
      <ModalWindow isOpen={isOpen} handleClose={handleClose}>
        <AddTodo handleOpenError={handleOpenError} handleClose={handleClose} />
      </ModalWindow>
    </>
  );
};
