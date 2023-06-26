import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import '../i18n'
import { RouterProvider } from 'react-router-dom'
import { router } from './routes/router'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <RouterProvider router={router} />
    </LocalizationProvider>
  </React.StrictMode>,
)
