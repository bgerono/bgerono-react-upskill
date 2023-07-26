import { IInvoice, IInvoiceItem } from '../models/invoice.model'

export const newInvoiceMock: IInvoice = {
  createdAt: '2023-07-17T22:00:00.000Z',
  items: [
    {
      name: 'string',
      amount: 23,
      unit: 'string',
      tax: 123,
      price: 12,
    },
  ],
  name: 'string',
  recipient: {
    companyName: 'string',
    city: 'string',
    street: 'string',
    postcode: '58-533',
    nip: 'string',
    phone: 'string',
    email: 'string',
    bankAccount: '1234123412341234',
  },
  sender: {
    companyName: 'string',
    city: 'string',
    street: 'string',
    postcode: '58-533',
    nip: 'string',
    phone: 'string',
    email: 'string',
    bankAccount: '1234123412341234',
  },
  validUntil: '2023-07-27T22:00:00.000Z',
}

export const useInvoice = () => {
  const createEmptyInvoice = (): IInvoice => {
    return {
      createdAt: '',
      name: '',
      items: [],
      validUntil: '',
      sender: undefined,
      recipient: undefined,
    }
  }

  const createEmptyInvoiceItem = (): IInvoiceItem => {
    return { name: '', tax: null, price: null, unit: '', amount: null }
  }

  const countInvoiceAmount = (items: IInvoiceItem[] | undefined) => {
    if (!items) {
      return 0
    }

    return items.reduce((item, next) => item + (next.amount || 0), 0)
  }

  return {
    countInvoiceAmount,
    createEmptyInvoice,
    createEmptyInvoiceItem,
  }
}
