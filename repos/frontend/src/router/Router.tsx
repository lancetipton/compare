import {
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom"

import { Error } from '@CPAF/pages/Error'
import { Layout } from '@CPAF/pages/Layout'

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        async lazy() {
          const { Dashboard } = await import("@CPAF/pages/Dashboard")
          return { Component: Dashboard }
        },
      },
      {
        path: `login`,
        async lazy() {
          const { Login } = await import("@CPAF/pages/Login")
          return { Component: Login }
        },
      },
    ]
  }
]);

export const Router = () => {
  return (<RouterProvider router={router} />)
}