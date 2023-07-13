import { IInvoice, IInvoiceItem } from '../models/invoice.model'

export const useInvoice = () => {
  const createInvoice = (
    id: string,
    createdAt: string,
    name: string,
    validUntil: string,
    items?: IInvoiceItem[],
  ): IInvoice => {
    return { id, createdAt, name, validUntil, items }
  }

  const createEmptyInvoice = (): IInvoice => createInvoice('', '', '', '', [])

  const createEmptyInvoiceItem = (): IInvoiceItem => {
    return { id: '', name: '', tax: undefined, price: undefined, unit: '', amount: undefined }
  }

  const countInvoiceAmount = (items: IInvoiceItem[] | undefined) => {
    if (!items) {
      return 0
    }

    return items.reduce((item, next) => item + (next.amount || 0), 0)
  }

  return { createInvoice, countInvoiceAmount, createEmptyInvoice, createEmptyInvoiceItem }
}
