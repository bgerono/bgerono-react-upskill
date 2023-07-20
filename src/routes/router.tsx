import { createBrowserRouter, Navigate } from 'react-router-dom'
import React from 'react'
import App from '../app'
import { InvoiceDetails } from '../components/invoice-details/invoice-details'
import { ErrorPage } from '../error-page'
import { InvoicesList } from '../components/invoices-list'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <Navigate to="/invoices" replace />,
      },
      {
        path: 'invoices',
        element: <InvoicesList />,
      },
      { path: 'invoice/:invoiceId?', element: <InvoiceDetails /> },
    ],
    errorElement: <ErrorPage />,
  },
])
