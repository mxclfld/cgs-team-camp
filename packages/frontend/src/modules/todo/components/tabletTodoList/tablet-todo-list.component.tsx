import React from 'react';
import { Container, Box } from '@mui/material';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCards } from 'swiper';
import { CONTAINER_WIDTH } from '../../../theme/sizes.const';
import { ITodo } from '../../types/todo.type';
import { CardItem } from '../cardItem/card-item.component';

import 'swiper/css';
import 'swiper/css/effect-cards';

type TodoListProps = {
  todos: ITodo[];
  handleScroll: () => void;
};

export const TabletTodoList = ({ todos, handleScroll }: TodoListProps) => (
  <Container>
    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
      <Swiper
        style={{ width: CONTAINER_WIDTH.tablet, position: 'static' }}
        effect="cards"
        grabCursor
        modules={[EffectCards]}
      >
        {todos.map((todo, i) => (
          <SwiperSlide key={todo.id}>
            {i === todos.length - 1 ? (
              <CardItem todo={todo} onTouch={handleScroll} />
            ) : (
              <CardItem todo={todo} />
            )}
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  </Container>
);
