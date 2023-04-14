import React from 'react';
import { Container, Button, Box } from '@mui/material';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCards } from 'swiper';
import { CONTAINER_WIDTH } from '../../../theme/sizes.const';
import { SPACES } from '../../../theme';
import { ITodo } from '../../types/todo.type';
import { AddTodo } from '../addTodo/add-todo.component';
import { CardItem } from '../cardItem/card-item.component';
import { Filter } from '../filter/filter.component';
import { ModalWindow } from '../../../common/components/modalWindow/modal-window.component';

import 'swiper/css';
import 'swiper/css/effect-cards';

type TodoListProps = {
  todos: ITodo[];
  isOpen: boolean;
  handleOpen: () => void;
  handleClose: () => void;
  handleOpenError: (msg: string) => void;
};

export const TabletTodoList = ({
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
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <Swiper
          style={{ width: CONTAINER_WIDTH.tablet, position: 'static' }}
          effect="cards"
          grabCursor
          modules={[EffectCards]}
        >
          {todos.map((todo) => (
            <SwiperSlide key={todo.id}>
              <CardItem todo={todo} />
            </SwiperSlide>
          ))}
        </Swiper>
      </Box>
    </Container>
    <ModalWindow isOpen={isOpen} handleClose={handleClose}>
      <AddTodo handleOpenError={handleOpenError} handleClose={handleClose} />
    </ModalWindow>
  </>
);
