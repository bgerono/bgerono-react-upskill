import { useMutation, useQuery } from '@tanstack/react-query'
import { IInvoice } from '../models/invoice.model'
import axios from 'axios'

const apiUrl = `http://localhost:4000/api/`

export const useInvoiceApi = () => {
  const getInvoices = () =>
    useQuery<IInvoice[]>({
      queryKey: ['invoices'],
      queryFn: async () => {
        const response = await axios.get(`${apiUrl}invoices`)

        return response.data
      },
    })

  const getInvoiceById = (invoiceId: string) =>
    useQuery<IInvoice>({
      queryKey: ['id'],
      queryFn: async () => {
        const response = await axios.get(`${apiUrl}invoices/${invoiceId}`)

        return response.data
      },
    })

  const removeInvoiceById = () => {
    return useMutation({
      mutationFn: async (invoiceId: string) => {
        await axios.delete(`${apiUrl}invoices/${invoiceId}`)
      },
    })
  }

  const updateInvoiceById = () => {
    return useMutation({
      mutationFn: async (invoice: IInvoice) => {
        await axios.put(`${apiUrl}invoices/${invoice.id}`, invoice)
      },
    })
  }

  return { getInvoices, removeInvoiceById, getInvoiceById, updateInvoiceById }
}
