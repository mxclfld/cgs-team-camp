import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import HomePageContainer from '../home';
import { APP_KEYS } from '../common/consts';
import { Login } from '../auth/login/login.component';
import { Register } from '../auth/register/register.component';
import { TodoContainer } from '../todo/containers/todoContainer/todo-container.component';
import { Profile } from '../auth/profile/profile.component';
import { ViewTodo } from '../todo/components/viewTodo/view-todo.component';

const router = createBrowserRouter([
  {
    path: APP_KEYS.ROUTER_KEYS.ROOT,
    element: <HomePageContainer />
  },
  {
    path: APP_KEYS.ROUTER_KEYS.LOGIN,
    element: <Login />
  },
  {
    path: APP_KEYS.ROUTER_KEYS.REGISTER,
    element: <Register />
  },
  {
    path: APP_KEYS.ROUTER_KEYS.TODOS_LIST,
    element: <TodoContainer />
  },
  {
    path: APP_KEYS.ROUTER_KEYS.TODO_ITEM,
    element: <ViewTodo />
  },
  {
    path: APP_KEYS.ROUTER_KEYS.PROFILE,
    element: <Profile />
  }
]);

export const MainRouter = () => <RouterProvider router={router} />;
