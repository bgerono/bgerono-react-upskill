import { createBrowserRouter } from 'react-router-dom'
import ErrorPage from '../error-page'
import React from 'react'
import InvoicesList from '../components/invoices-list'
import App from '../app'
import InvoiceDetails from '../components/invoice-details'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { path: 'invoices', element: <InvoicesList /> },
      { path: 'invoice/:invoiceId', element: <InvoiceDetails /> },
    ],
    errorElement: <ErrorPage />,
  },
])
