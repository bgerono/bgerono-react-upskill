import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'
import { Navbar } from './components/navbar'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { LoaderContext } from './context/LoaderContex'
import { BackdropLoader } from './components/ui/backdrop'

const queryClient = new QueryClient()

export default function App() {
  const [loader, setLoader] = useState<boolean>(false)
  return (
    <QueryClientProvider client={queryClient}>
      <LoaderContext.Provider value={{ loader, setLoader }}>
        <Navbar></Navbar>
        <div id="content">
          <Outlet />
        </div>
        <BackdropLoader isOpen={loader}></BackdropLoader>
      </LoaderContext.Provider>
    </QueryClientProvider>
  )
}
