import React, { useEffect } from 'react';
import { Container, Box } from '@mui/material';
import { ITodo } from '../../types/todo.type';
import { CardItem } from '../cardItem/card-item.component';

type TodoListProps = {
  todos: ITodo[];
  handleScroll: () => void;
};

export const MobileTodoList = ({ todos, handleScroll }: TodoListProps) => {
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <Container>
      <Box>
        {todos.map((todo) => (
          <CardItem key={todo.id} todo={todo} />
        ))}
      </Box>
    </Container>
  );
};
