import { Invoice } from '../models/invoice.model'
import { useCallback } from 'react'

export const createInvoice = useCallback(
  (id: string, amount: number | null, created: string, validUntil: string): Invoice => {
    return { id, amount, created, validUntil }
  },
  [],
)
