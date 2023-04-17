import React, { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { Container, Pagination } from '@mui/material';
import { AxiosError } from 'axios';
import { Header } from '../../../header/header.component';
import { DesktopTodoList } from '../../components/dekstopTodoList/desktop-todo-list.component';
import { APP_KEYS } from '../../../common/consts';
import { todoService } from '../../services/todo.service';
import { useDevice } from '../../../common/hooks/useDevice';
import { MobileTodoList } from '../../components/mobileTodoList/mobile-todo-list.component';
import { TabletTodoList } from '../../components/tabletTodoList/tablet-todo-list.component';
import { ErrorModal } from '../../../common/components/error/error.component';
import { Filter } from '../../components/filter/filter.component';
import { DeviceEnum } from '../../../common/types/device.types';
import { ITodo } from '../../types/todo.type';
import { SPACES } from '../../../theme';

export const TodoContainer = () => {
  const [isError, setIsError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [search, setSearch] = useState<string>('');
  const [status, setStatus] = useState<string>('');
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [pagesCount, setPagesCount] = useState<number>(0);
  const [todos, setTodos] = useState<ITodo[]>([]);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const device = useDevice();

  const handleOpenError = (msg: string) => {
    setIsError(true);
    setErrorMessage(msg);
  };

  const { refetch } = useQuery({
    queryKey: [APP_KEYS.QUERY_KEYS.TODOS],
    queryFn: () => todoService.getTodos({ page: pageNumber, search, status }),
    onSuccess: (successData) => {
      setPagesCount(Math.ceil((successData?.data.count || 0) / 5));
      if (device !== DeviceEnum.DESKTOP) {
        setTodos((prev) => [...prev, ...(successData?.data.todos || [])]);
      } else {
        setTodos(successData?.data.todos);
      }
    },
    onError: (err: AxiosError) => {
      handleOpenError(err.message);
    }
  });

  useEffect(() => {
    refetch();
  }, [pageNumber, search, status]);

  const handleCloseError = () => setIsError(false);

  const handleChangePage = (event: React.ChangeEvent<unknown>, value: number) => {
    setPageNumber(value);
  };
  const handleSearch = (value: string) => {
    setSearch(value);
    setPageNumber(1);
  };
  const handleStatus = (value: string) => {
    setStatus(value);
    setPageNumber(1);
  };

  const handleVerticalScroll = () => {
    const { scrollTop, clientHeight, scrollHeight } = document.documentElement;
    if (scrollTop + clientHeight >= scrollHeight) {
      setPageNumber((prev) => prev + 1);
    }
  };
  const handleHorizontalScroll = () => {
    setPageNumber((prev) => prev + 1);
  };

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  return (
    <>
      <Header />
      <Container>
        <Filter search={search} setSearch={handleSearch} setStatus={handleStatus} />
        {device === DeviceEnum.MOBILE ? (
          <MobileTodoList
            todos={todos}
            isOpen={isOpen}
            handleOpen={handleOpen}
            handleClose={handleClose}
            handleOpenError={handleOpenError}
            handleScroll={handleVerticalScroll}
          />
        ) : device === DeviceEnum.TABLET ? (
          <TabletTodoList
            handleOpenError={handleOpenError}
            isOpen={isOpen}
            handleOpen={handleOpen}
            handleClose={handleClose}
            todos={todos}
            handleScroll={handleHorizontalScroll}
          />
        ) : (
          <>
            <DesktopTodoList
              handleOpenError={handleOpenError}
              isOpen={isOpen}
              handleOpen={handleOpen}
              handleClose={handleClose}
              todos={todos}
            />
            <Pagination
              sx={{ mt: SPACES.l }}
              count={pagesCount}
              page={pageNumber}
              onChange={handleChangePage}
            />
          </>
        )}
      </Container>
      <ErrorModal isOpen={isError} handleClose={handleCloseError} message={errorMessage} />
    </>
  );
};
