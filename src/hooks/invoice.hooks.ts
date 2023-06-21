import { Invoice } from '../models/invoice.model'

export const createInvoice = (
  id: string,
  amount: number | null,
  created: string,
  validUntil: string,
): Invoice => {
  return { id, amount, created, validUntil }
}
