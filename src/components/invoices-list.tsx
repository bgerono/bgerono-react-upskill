import React, { FC, ReactElement } from 'react'
import {
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import { useTranslation } from 'react-i18next'
import { useInvoice } from '../hooks/invoice.hooks'

export const InvoicesList: FC = (): ReactElement => {
  const { t } = useTranslation()
  const { createInvoice } = useInvoice()
  const rows = [
    createInvoice('1/2023', 159, '22/03/2022', '22/03/2022'),
    createInvoice('21/02/2022', 237, '12/02/2022', '22/03/2022'),
    createInvoice('F-45//20', 262, '2/3/2020', '22/03/2022'),
    createInvoice('2/2023', 305, '22/03/2022', '22/03/2022'),
    createInvoice('3/2034', 356, '22/03/2022', '22/03/2022'),
  ]

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>{t('NUMBER')}</TableCell>
            <TableCell align="right">{t('CREATED')}</TableCell>
            <TableCell align="right">{t('VALID_UNTIL')}</TableCell>
            <TableCell align="right">{t('AMOUNT')}</TableCell>
            <TableCell align="right">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((invoice) => (
            <TableRow key={invoice.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell component="th" scope="row">
                {invoice.id}
              </TableCell>
              <TableCell align="right">{invoice.created}</TableCell>
              <TableCell align="right">{invoice.validUntil}</TableCell>
              <TableCell align="right">{invoice.amount}</TableCell>
              <TableCell align="right">
                <IconButton color="secondary" aria-label="edit inovice" size="small">
                  <EditIcon />
                </IconButton>
                <IconButton color="secondary" aria-label="delete invoice" size="small">
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
