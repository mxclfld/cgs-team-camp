import React, { useState } from 'react';
import { Button, Switch } from '@mui/material';
import { useMutation, useQueryClient } from 'react-query';
import { Link } from 'react-router-dom';
import { AxiosError } from 'axios';
import { APP_KEYS } from '../../../common/consts';
import { ITodo } from '../../types/todo.type';
import { todoService } from '../../services/todo.service';
import { EditTodo } from '../editTodo/edit-todo.component';
import { ModalWindow } from '../../../common/components/modalWindow/modal-window.component';
import { ErrorModal } from '../../../common/components/error/error.component';
import { authService } from '../../../auth/services/auth.service';

type ActionsProps = {
  todo: ITodo;
};

export const Actions = ({ todo }: ActionsProps) => {
  const queryClient = useQueryClient();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const isTodoCreator = authService.getUserId() === todo.userId;

  const [isError, setIsError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const handleOpenError = (msg: string) => {
    setIsError(true);
    setErrorMessage(msg);
  };
  const handleCloseError = () => setIsError(false);

  const { mutate: deleteTodoMutation } = useMutation({
    mutationFn: (id: string) => todoService.deleteTodo(id),
    onSuccess: () => {
      queryClient.invalidateQueries([APP_KEYS.QUERY_KEYS.TODOS]);
    },
    onError: (err: AxiosError) => {
      handleOpenError(err.message);
    }
  });

  const { mutate: toggleCompletedMutation } = useMutation({
    mutationFn: (id: string) => todoService.toggleCompleted(id),
    onSuccess: () => {
      queryClient.invalidateQueries([APP_KEYS.QUERY_KEYS.TODOS]);
    },
    onError: (err: AxiosError) => {
      handleOpenError(err.message);
    }
  });

  const handleDelete = () => {
    deleteTodoMutation(todo.id);
  };

  const handleComplete = () => {
    toggleCompletedMutation(todo.id);
  };

  const handleOpenEdit = () => {
    setIsOpen(true);
  };

  const handleClose = () => setIsOpen(false);

  return (
    <>
      <Button type="button" component={Link} to={`${APP_KEYS.ROUTER_KEYS.TODOS_LIST}/${todo.id}`}>
        View
      </Button>
      <Button type="button" onClick={handleOpenEdit} disabled={!isTodoCreator}>
        Edit
      </Button>
      <Button type="button" onClick={handleDelete} disabled={!isTodoCreator}>
        Delete
      </Button>
      <Switch checked={!!todo.isCompleted} onChange={handleComplete} disabled={!isTodoCreator} />
      <ModalWindow isOpen={isOpen} handleClose={handleClose}>
        <EditTodo handleClose={handleClose} todo={todo} />
      </ModalWindow>
      <ErrorModal isOpen={isError} handleClose={handleCloseError} message={errorMessage} />
    </>
  );
};
