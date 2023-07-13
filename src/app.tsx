import React from 'react'
import { Outlet } from 'react-router-dom'
import { Navbar } from './components/navbar'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient()

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div>
        <Navbar></Navbar>
        <div id="content">
          <Outlet />
        </div>
      </div>
    </QueryClientProvider>
  )
}
