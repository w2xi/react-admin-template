import { createBrowserRouter, useRoutes } from 'react-router-dom';
import Login from '../pages/login';
import LayoutPage from '../pages/layout';
import { lazy} from 'react';
import type { FC } from 'react';

const NotFound = lazy(() => import('../pages/404'));

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
        path: '/dashboard',
        element: <div>dashboard</div>
      },
      {
        path: '/icon',
        element: <div>icon</div>
      },
      {
        path: '/charts',
        element: <div>charts</div>
      },
      {
        path: '/charts/bar',
        element: <div>bar</div>
      },
      {
        path: '/charts/line',
        element: <div>line</div>
      },
      {
        path: '*',
        element: <NotFound />
      }
    ]
  }
];

const RenderRouter: FC = () => {
  const element = useRoutes(routeList);
  return element;
}

export default RenderRouter;