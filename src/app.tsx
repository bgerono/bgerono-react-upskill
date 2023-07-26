import React, { useReducer, useState } from 'react'
import { Outlet } from 'react-router-dom'
import { Navbar } from './components/navbar'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { BackdropLoader } from './components/ui/backdrop'
import { MsgTypeEnum, IToastMsgState } from './models/invoice.model'
import { toastMsgReducer } from './reducers/toasr-msg-reducer'
import { LoaderContext } from './context/loader-context'
import { ToastMsgContext } from './context/toast-msg-context'
import { ToastMsg } from './components/ui/toast-msg'

const queryClient = new QueryClient()

export const initState: IToastMsgState = {
  isOpen: false,
  type: MsgTypeEnum.success,
  msg: '',
}

export default function App() {
  const [loader, setLoader] = useState<boolean>(false)
  const [toastMsgState, dispatch] = useReducer(toastMsgReducer, initState)

  return (
    <QueryClientProvider client={queryClient}>
      <LoaderContext.Provider value={{ loader, setLoader }}>
        <ToastMsgContext.Provider value={{ toastMsgState, dispatch }}>
          <Navbar></Navbar>
          <div id="content">
            <Outlet />
          </div>
          <BackdropLoader isOpen={loader}></BackdropLoader>
          <ToastMsg></ToastMsg>
        </ToastMsgContext.Provider>
      </LoaderContext.Provider>
    </QueryClientProvider>
  )
}
