import { createBrowserRouter, Navigate } from 'react-router-dom'
// import Dashboard from './views/Dashboard'
// import Login from './views/Login'
import React, { lazy } from 'react'
import ErrorBoundary from './components/ErrorBoundary'
import AuthGuard from './components/Guards/AuthGuard'

const Login = lazy(() => import('./views/Login'))
const Dashboard = lazy(() => import('./views/Dashboard'))

const routes = [
  {
    index: true,
    element: <Navigate to='/login' />,
    errorElement: <ErrorBoundary />
  },
  {
    path: 'login',
    element: <Login />,
    errorElement: <ErrorBoundary />
  },
  {
    path: '/',
    element: <AuthGuard />,
    children: [
      {
        path: 'dashboard',
        element: <Dashboard />,
        errorElement: <ErrorBoundary />
      }
    ]
  },
  {
    path: '*',
    element: <Navigate to='/login' />,
    errorElement: <ErrorBoundary />
  }
]
const router = createBrowserRouter(routes)
export default router
