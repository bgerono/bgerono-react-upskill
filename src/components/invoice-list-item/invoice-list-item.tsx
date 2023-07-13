import React, { FC, useMemo, useState } from 'react'
import { IconButton, TableCell, TableRow } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import { IInvoice } from '../../models/invoice.model'
import { useInvoice } from '../../hooks/invoice.hooks'
import { useInvoiceApi } from '../../hooks/invoice-api.hooks'
import { QueryObserverResult } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'

interface IInvoiceListItemProps {
  invoice: IInvoice
  refetchList: () => Promise<QueryObserverResult<IInvoice[]>>
}

export const InvoiceListItem: FC<IInvoiceListItemProps> = (invoiceListItemProps) => {
  const { removeInvoiceById } = useInvoiceApi()
  const { countInvoiceAmount } = useInvoice()
  const navigate = useNavigate()
  const removeMutation = removeInvoiceById()
  const { invoice, refetchList } = invoiceListItemProps
  const [isLoading, setLoading] = useState(false)
  const onRemove = () => {
    setLoading(true)
    removeMutation.mutate(invoice.id, {
      onSuccess: () =>
        refetchList().then(() => {
          setLoading(false)
        }),
    })
  }

  return useMemo(
    () => (
      <TableRow key={invoice.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
        <TableCell component="th" scope="row">
          {invoice.name}
        </TableCell>
        <TableCell align="right">{invoice.createdAt}</TableCell>
        <TableCell align="right">{invoice.validUntil}</TableCell>
        <TableCell align="right">{countInvoiceAmount(invoice.items)}</TableCell>
        <TableCell align="right">
          <IconButton
            color="secondary"
            aria-label="edit inovice"
            size="small"
            disabled={isLoading}
            onClick={() => {
              console.log('edit invoice:id: ', invoice.id)
              navigate(`/invoice/${invoice.id}`)
            }}
          >
            <EditIcon />
          </IconButton>
          <IconButton
            color="secondary"
            aria-label="delete invoice"
            size="small"
            disabled={isLoading}
            onClick={onRemove}
          >
            <DeleteIcon />
          </IconButton>
        </TableCell>
      </TableRow>
    ),
    [invoice, isLoading],
  )
}
