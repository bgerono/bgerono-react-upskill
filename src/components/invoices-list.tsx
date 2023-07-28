import React, { FC, ReactElement, useContext, useEffect } from 'react'
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material'
import { useTranslation } from 'react-i18next'
import { useInvoiceApi } from '../hooks/invoice-api.hooks'
import { UseQueryResult } from '@tanstack/react-query'
import { IInvoice } from '../models/invoice.model'
import { InvoiceListItem } from './invoice-list-item/invoice-list-item'
import { ILoaderContext, LoaderContext } from '../context/loader-context'

export const InvoicesList: FC = (): ReactElement => {
  const { t } = useTranslation()
  const { getInvoices } = useInvoiceApi()
  const invoiceListQuery: UseQueryResult<IInvoice[]> = getInvoices()
  const { setLoader } = useContext(LoaderContext) as ILoaderContext

  useEffect(() => {
    setLoader(invoiceListQuery.isLoading)
  }, [invoiceListQuery.isLoading])

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>{t('NAME')}</TableCell>
            <TableCell align="right">{t('CREATED')}</TableCell>
            <TableCell align="right">{t('VALID_UNTIL')}</TableCell>
            <TableCell align="right">{t('AMOUNT')}</TableCell>
            <TableCell align="right">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {invoiceListQuery.data?.map((invoice) => (
            <InvoiceListItem
              key={invoice.id}
              invoice={invoice}
              refetchList={invoiceListQuery.refetch}
            ></InvoiceListItem>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
