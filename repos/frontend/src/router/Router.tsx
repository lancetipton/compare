import {
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom"

import { Error } from '@LKF/pages/Error'
import { Layout } from '@LKF/pages/Layout'

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        async lazy() {
          const { Dashboard } = await import("@LKF/pages/Dashboard")
          return { Component: Dashboard }
        },
      },
      {
        path: `login`,
        async lazy() {
          const { Login } = await import("@LKF/pages/Login")
          return { Component: Login }
        },
      },
    ]
  }
]);

export const Router = () => {
  return (<RouterProvider router={router} />)
}