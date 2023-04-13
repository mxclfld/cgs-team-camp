import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { Button, Container, Typography } from '@mui/material';
import { AxiosError } from 'axios';
import { Header } from '../../../header/header.component';
import { DesktopTodoList } from '../../components/dekstopTodoList/desktop-todo-list.component';
import { APP_KEYS } from '../../../common/consts';
import { ITodo } from '../../types/todo.type';
import { todoService } from '../../services/todo.service';
import { useDevice } from '../../../common/hooks/useDevice';
import { MobileTodoList } from '../../components/mobileTodoList/mobile-todo-list.component';
import { TabletTodoList } from '../../components/tabletTodoList/tablet-todo-list.component';
import { ModalWindow } from '../../components/modalWindow/modal-window.component';

export const TodoContainer = () => {
  const [isError, setIsError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const handleOpenError = (msg: string) => {
    setIsError(true);
    setErrorMessage(msg);
  };
  const handleCloseError = () => setIsError(false);

  const { data } = useQuery({
    queryKey: [APP_KEYS.QUERY_KEYS.TODOS],
    queryFn: () => todoService.getTodos(),
    onError: (err: AxiosError) => {
      handleOpenError(err.message);
    }
  });

  const device = useDevice();

  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  const todos: ITodo[] = data?.data || [];
  return (
    <>
      <Header />
      <Container>
        {device === 'mobile' ? (
          <MobileTodoList
            handleOpenError={handleOpenError}
            isOpen={isOpen}
            handleOpen={handleOpen}
            handleClose={handleClose}
            todos={todos}
          />
        ) : device === 'tablet' ? (
          <TabletTodoList
            handleOpenError={handleOpenError}
            isOpen={isOpen}
            handleOpen={handleOpen}
            handleClose={handleClose}
            todos={todos}
          />
        ) : (
          <DesktopTodoList
            handleOpenError={handleOpenError}
            isOpen={isOpen}
            handleOpen={handleOpen}
            handleClose={handleClose}
            todos={todos}
          />
        )}
      </Container>
      <ModalWindow isOpen={isError} handleClose={handleCloseError}>
        <>
          <Typography variant="body1">{errorMessage}</Typography>
          <Button onClick={handleCloseError}>Close</Button>
        </>
      </ModalWindow>
    </>
  );
};