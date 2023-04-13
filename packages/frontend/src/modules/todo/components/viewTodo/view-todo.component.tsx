import React, { useEffect } from 'react';
import { useQuery } from 'react-query';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, Container, FormControlLabel, FormGroup, Switch, Typography } from '@mui/material';
import { APP_KEYS } from '../../../common/consts';
import { todoService } from '../../services/todo.service';
import { Header } from '../../../header/header.component';
import { ITodo } from '../../types/todo.type';
import { SPACES } from '../../../theme';

export const ViewTodo = () => {
  const navigate = useNavigate();
  const { todoId } = useParams();
  const { data, refetch } = useQuery({
    queryFn: () => todoService.getTodoById(todoId!)
  });

  useEffect(() => {
    refetch();
  }, []);

  const handleBack = () => {
    navigate(APP_KEYS.ROUTER_KEYS.TODOS_LIST);
  };

  const todo: ITodo | null = data?.data || null;

  if (!todo) {
    return <div>err</div>;
  }

  return (
    <>
      <Header />
      <Container>
        <Typography variant="h3">{todo.name}</Typography>
        <Typography variant="body2">{todo.description}</Typography>
        <FormGroup sx={{ display: 'flex', flexDirection: 'column', mt: SPACES.s, mb: SPACES.s }}>
          <FormControlLabel control={<Switch checked={todo.isCompleted} />} label="Completed" />
          <FormControlLabel control={<Switch checked={todo.isPrivate} />} label="Private" />
        </FormGroup>
        <Button sx={{ display: 'block' }} type="button" onClick={handleBack}>
          Back
        </Button>
      </Container>
    </>
  );
};
