import { AlertColor } from '@mui/material'

export interface IInvoice {
  id?: string
  name: string
  createdAt: string
  validUntil: string
  recipient: IInvoiceCompany | undefined
  sender: IInvoiceCompany | undefined
  items: IInvoiceItem[]
}

export interface IInvoiceItem {
  id?: string
  name: string
  tax: number | null
  price: number | null
  unit: string
  amount: number | null
}

export interface IInvoiceCompany {
  bankAccount: string
  city: string
  companyName: string
  email: string
  id?: string
  nip: string
  phone: string
  postcode: string
  street: string
}

export const enum MsgTypeEnum {
  // eslint-disable-next-line no-unused-vars
  error = 'error',
  // eslint-disable-next-line no-unused-vars
  warning = 'warning',
  // eslint-disable-next-line no-unused-vars
  success = 'success',
  // eslint-disable-next-line no-unused-vars
  info = 'info',
  // eslint-disable-next-line no-unused-vars
  hide = 'hide',
}

export interface IToastMsgAction {
  type: MsgTypeEnum
  msg?: string
}

export const InvoiceDateFormat = 'YYYY-MM-DD'

export const enum CompanyType {
  // eslint-disable-next-line no-unused-vars
  recipient = 'recipient',
  // eslint-disable-next-line no-unused-vars
  sender = 'sender',
}

export interface IToastMsgState {
  isOpen: boolean
  type: AlertColor
  msg?: string
}
