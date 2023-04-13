import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePageContainer from '../home';
import { APP_KEYS } from '../common/consts';
import { Login } from '../auth/login/login.component';
import { Register } from '../auth/register/register.component';
import { TodoContainer } from '../todo/containers/todoContainer/todo-container.component';
import { ChangePassword } from '../auth/changePassword/change-password.component';
import { ViewTodo } from '../todo/components/viewTodo/view-todo.component';
import ProfilePageContainer from '../profile';

export const MainRouter = () => (
  <BrowserRouter>
    <Routes>
      <Route path={APP_KEYS.ROUTER_KEYS.ROOT} element={<HomePageContainer />} />
      <Route path={APP_KEYS.ROUTER_KEYS.LOGIN} element={<Login />} />
      <Route path={APP_KEYS.ROUTER_KEYS.REGISTER} element={<Register />} />
      <Route path={APP_KEYS.ROUTER_KEYS.TODOS_LIST} element={<TodoContainer />} />
      <Route path={APP_KEYS.ROUTER_KEYS.TODO_ITEM} element={<ViewTodo />} />
      <Route path={APP_KEYS.ROUTER_KEYS.PROFILE} element={<ProfilePageContainer />} />
      <Route path={APP_KEYS.ROUTER_KEYS.CHANGE_PASSWORD} element={<ChangePassword />} />
    </Routes>
  </BrowserRouter>
);
