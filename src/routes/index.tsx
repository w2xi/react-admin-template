import { lazy} from 'react';
import { useRoutes } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import Login from '../pages/login';
import LayoutPage from '../pages/layout';
import LinePage from '../pages/charts/line';
import BarPage from '../pages/charts/bar';
import ArticlePage from '../pages/business/article';
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
        path: '',
        element: <Navigate to="dashboard" />,
      },
      {
        path: '/dashboard',
        element: <div>dashboard</div>
      },
      {
        path: '/icon',
        element: <div>icon</div>
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
  }
];

const RenderRouter: FC = () => {
  const element = useRoutes(routeList);
  return element;
}

export default RenderRouter;