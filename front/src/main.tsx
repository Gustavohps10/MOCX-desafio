import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from "react-router-dom"

import Root from './pages/Root'
import Users from './pages/Users';
import EditUser from './pages/EditUser'

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
  },
  {
    path: "/users",
    element: <Users />,
  },
  {
    path: "/users/:id/edit",
    element: <EditUser/>
  }
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
      <RouterProvider router={router} />
)
