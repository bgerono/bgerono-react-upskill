import { Invoice } from '../models/invoice.model'

export const useInvoice = () => {
  const createInvoice = (
    id: string,
    amount: number | null,
    created: string,
    validUntil: string,
  ): Invoice => {
    return { id, amount, created, validUntil }
  }

  return { createInvoice }
}
