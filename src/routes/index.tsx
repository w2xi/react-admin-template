import { lazy} from 'react';
import { useRoutes, Navigate } from 'react-router-dom';
import Login from '../pages/login';
import LayoutPage from '../pages/layout';
import type { FC } from 'react';
import type { RouteObject } from 'react-router-dom'; 

const BarPage = lazy(() => import('../pages/charts/bar'));
const LinePage = lazy(() => import('../pages/charts/line'));
const ArticlePage = lazy(() => import('../pages/business/article'));
const NotFound = lazy(() => import('../pages/404'));

const routeList: RouteObject[] = [
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/',
    element: <LayoutPage />,
    children: [
      {
        path: '',
        element: <Navigate to="dashboard" />,
      },
      {
        path: '/dashboard',
        element: <div>dashboard</div>
      },
      {
        path: '/charts/bar',
        element: <BarPage />
      },
      {
        path: '/charts/line',
        element: <LinePage />
      },
      {
        path: '/business/article',
        element: <ArticlePage />
      },
      {
        path: '*',
        element: <NotFound />
      }
    ]
  },
];

const RenderRouter: FC = () => {
  const element = useRoutes(routeList);
  return element;
}

export default RenderRouter;