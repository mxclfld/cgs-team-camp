import React, { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { Container } from '@mui/material';
import { AxiosError } from 'axios';
import InfiniteScroll from 'react-infinite-scroll-component';
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

export const TodoContainer = () => {
  const [isError, setIsError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [search, setSearch] = useState<string>('');
  const [status, setStatus] = useState<string>('');
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [todos, setTodos] = useState<ITodo[]>([]);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const device = useDevice();

  const handleOpenError = (msg: string) => {
    setIsError(true);
    setErrorMessage(msg);
  };

  const { data, refetch } = useQuery({
    queryKey: [APP_KEYS.QUERY_KEYS.TODOS],
    queryFn: () => todoService.getTodos({ page: pageNumber, search, status }),
    onSuccess: (successData) => {
      setTodos(successData?.data.todos);
    },
    onError: (err: AxiosError) => {
      handleOpenError(err.message);
    }
  });

  useEffect(() => {
    refetch();
  }, [pageNumber]);

  const handleCloseError = () => setIsError(false);
  const handleSearch = (value: string) => {
    setSearch(value);
    setPageNumber(1);
  };

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);
  const handleNextScroll = () => setPageNumber((page) => page + 1);

  return (
    <>
      <Header />
      <Container>
        <Filter search={search} setSearch={handleSearch} setStatus={setStatus} />
        {device === DeviceEnum.MOBILE ? (
          <InfiniteScroll
            dataLength={data?.data.count || 0}
            next={handleNextScroll}
            hasMore
            height={500}
            loader={<h4>Loading...</h4>}
          >
            <MobileTodoList
              handleOpenError={handleOpenError}
              isOpen={isOpen}
              handleOpen={handleOpen}
              handleClose={handleClose}
              todos={todos}
            />
          </InfiniteScroll>
        ) : device === DeviceEnum.TABLET ? (
          <InfiniteScroll
            dataLength={data?.data.count || 0}
            next={handleNextScroll}
            hasMore
            height={300}
            loader={<h4>Loading...</h4>}
          >
            <TabletTodoList
              handleOpenError={handleOpenError}
              isOpen={isOpen}
              handleOpen={handleOpen}
              handleClose={handleClose}
              todos={todos}
            />
          </InfiniteScroll>
        ) : (
          <InfiniteScroll
            dataLength={data?.data.count || 0}
            next={handleNextScroll}
            hasMore
            height={400}
            loader={<h4>Loading...</h4>}
          >
            <DesktopTodoList
              handleOpenError={handleOpenError}
              isOpen={isOpen}
              handleOpen={handleOpen}
              handleClose={handleClose}
              todos={todos}
            />
          </InfiniteScroll>
        )}
      </Container>
      <ErrorModal isOpen={isError} handleClose={handleCloseError} message={errorMessage} />
    </>
  );
};
