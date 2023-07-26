import { createContext } from 'react'
import { IToastMsgAction, IToastMsgState } from '../models/invoice.model'

export interface IToastMsgContext {
  toastMsgState: IToastMsgState
  // eslint-disable-next-line no-unused-vars
  dispatch: (action: IToastMsgAction) => void
}

export const ToastMsgContext = createContext<IToastMsgContext | null>(null)
