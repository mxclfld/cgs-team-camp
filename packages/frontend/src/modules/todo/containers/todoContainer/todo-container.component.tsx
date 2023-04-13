import React, { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { Container } from '@mui/material';
import { AxiosError } from 'axios';
import { Header } from '../../../header/header.component';
import { DesktopTodoList } from '../../components/dekstopTodoList/desktop-todo-list.component';
import { APP_KEYS } from '../../../common/consts';
import { ITodo } from '../../types/todo.type';
import { todoService } from '../../services/todo.service';
import { useDevice } from '../../../common/hooks/useDevice';
import { MobileTodoList } from '../../components/mobileTodoList/mobile-todo-list.component';
import { TabletTodoList } from '../../components/tabletTodoList/tablet-todo-list.component';
<<<<<<< HEAD
import { ErrorModal } from '../../../common/components/error/error.component';
=======
import { ModalWindow } from '../../components/modalWindow/modal-window.component';
import { Filter } from '../../components/filter/filter.component';
>>>>>>> cade125 (feat: Move filter from device containers to page container and connect filter to backend)

export const TodoContainer = () => {
  const [isError, setIsError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [search, setSearch] = useState<string>('');
  const [status, setStatus] = useState<string>('');

  const handleOpenError = (msg: string) => {
    setIsError(true);
    setErrorMessage(msg);
  };
  const handleCloseError = () => setIsError(false);
  console.log('RENDER');

  const { data, refetch } = useQuery({
    queryKey: [APP_KEYS.QUERY_KEYS.TODOS],
    queryFn: () => todoService.getTodos({ search, status }),
    onError: (err: AxiosError) => {
      handleOpenError(err.message);
    }
  });

  useEffect(() => {
    refetch();
  }, [search, status]);

  const device = useDevice();

  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  const todos: ITodo[] = data?.data || [];
  return (
    <>
      <Header />
      <Container>
        <Filter search={search} setSearch={setSearch} setStatus={setStatus} />
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
      <ErrorModal isOpen={isError} handleClose={handleCloseError} message={errorMessage} />
    </>
  );
};
