import { lazy } from 'react'
import { useRoutes, Navigate } from 'react-router-dom'
import Login from '../pages/login'
import LayoutPage from '../pages/layout'
import type { FC } from 'react'
import type { RouteObject } from 'react-router-dom'

const Dashboard = lazy(() => import('../pages/dashboard'))
const BarPage = lazy(() => import('../pages/charts/bar'))
const LinePage = lazy(() => import('../pages/charts/line'))
const ArticlePage = lazy(() => import('../pages/business/article'))
const JSONEditorPage = lazy(() => import('../pages/components-demo/json-editor'))
const NotFound = lazy(() => import('../pages/error/404'))
const NoPermission = lazy(() => import('../pages/error/403'))

const routeList: RouteObject[] = [
  {
    path: '/login',
    element: <Login />,
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
        element: <Dashboard />,
      },
      {
        path: '/charts/bar',
        element: <BarPage />,
      },
      {
        path: '/charts/line',
        element: <LinePage />,
      },
      {
        path: '/business/article',
        element: <ArticlePage />,
      },
      {
        path: '/components/json-editor',
        element: <JSONEditorPage />,
      },
      {
        path: '/error/404',
        element: <NotFound />,
      },
      {
        path: '/error/403',
        element: <NoPermission />,
      },
      {
        path: '*',
        element: <NotFound />,
      },
    ],
  },
]

const RenderRouter: FC = () => {
  const element = useRoutes(routeList)
  return element
}

export default RenderRouter
