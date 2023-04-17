import React from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import HomePageContainer from '../home';
import { APP_KEYS } from '../common/consts';
import { Login } from '../auth/login/login.component';
import { Register } from '../auth/register/register.component';
import { TodoContainer } from '../todo/containers/todoContainer/todo-container.component';
import { ChangePassword } from '../auth/changePassword/change-password.component';
import { ViewTodo } from '../todo/components/viewTodo/view-todo.component';
import ProfilePageContainer from '../profile';
import { authService } from '../auth/services/auth.service';

const NavigateToRoot = () => <Navigate to={APP_KEYS.ROUTER_KEYS.ROOT} />;

export const MainRouter = () => {
  const isAuth = authService.isLoggedIn();

  return (
    <BrowserRouter>
      <Routes>
        <Route path={APP_KEYS.ROUTER_KEYS.ROOT} element={<HomePageContainer />} />
        <Route path={APP_KEYS.ROUTER_KEYS.LOGIN} element={<Login />} />
        <Route path={APP_KEYS.ROUTER_KEYS.REGISTER} element={<Register />} />
        <Route
          path={APP_KEYS.ROUTER_KEYS.TODOS_LIST}
          element={isAuth ? <TodoContainer /> : <NavigateToRoot />}
        />
        <Route
          path={APP_KEYS.ROUTER_KEYS.TODO_ITEM}
          element={isAuth ? <ViewTodo /> : <NavigateToRoot />}
        />
        <Route
          path={APP_KEYS.ROUTER_KEYS.PROFILE}
          element={isAuth ? <ProfilePageContainer /> : <NavigateToRoot />}
        />
        <Route
          path={APP_KEYS.ROUTER_KEYS.CHANGE_PASSWORD}
          element={isAuth ? <ChangePassword /> : <NavigateToRoot />}
        />
      </Routes>
    </BrowserRouter>
  );
};
