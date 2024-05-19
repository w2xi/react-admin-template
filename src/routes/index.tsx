import { createBrowserRouter, useRoutes } from 'react-router-dom';
import LayoutPage from '../pages/layout';
import Login from '../pages/login';
import type { FC } from 'react';

const routeList = [
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/',
    element: <LayoutPage />,
    children: [
      {
        path: '/1',
        element: <div>1</div>
      },
      {
        path: '/2',
        element: <div>2</div>
      },
      {
        path: '/3',
        element: <div>3</div>
      }
    ]
  }
];

const RenderRouter: FC = () => {
  const element = useRoutes(routeList);
  return element;
}

export default RenderRouter;