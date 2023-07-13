import React, { FC, ReactElement } from 'react'
import { IconButton, TextField } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import { InvoiceItem, InvoiceItemName, InvoiceItemOthers } from './invoice-details-styled'
import { useTranslation } from 'react-i18next'
import { useFormContext } from 'react-hook-form'

interface IInvoiceDetailsItemProps {
  invoiceItemIndex: number
  onInvoiceItemRemove: () => void
}

export const InvoiceDetailsItem: FC<IInvoiceDetailsItemProps> = (
  invoiceDetailsItemProps,
): ReactElement => {
  const { t } = useTranslation()
  const { invoiceItemIndex, onInvoiceItemRemove } = invoiceDetailsItemProps
  const { register } = useFormContext()

  return (
    <InvoiceItem>
      <InvoiceItemName>
        <TextField
          sx={{ width: '100%' }}
          label={t('NAME')}
          variant="standard"
          {...register(`items.${invoiceItemIndex}.name`)}
        />
      </InvoiceItemName>
      <InvoiceItemOthers>
        <TextField
          label={t('AMOUNT')}
          variant="standard"
          {...register(`items.${invoiceItemIndex}.amount`)}
        />
        <TextField
          label={t('UNIT')}
          variant="standard"
          {...register(`items.${invoiceItemIndex}.unit`)}
        />
        <TextField
          label={t('TAX')}
          variant="standard"
          {...register(`items.${invoiceItemIndex}.tax`)}
        />
        <TextField
          label={t('PRICE')}
          variant="standard"
          {...register(`items.${invoiceItemIndex}.price`)}
        />
        <IconButton aria-label="delete" onClick={() => onInvoiceItemRemove()}>
          <DeleteIcon />
        </IconButton>
      </InvoiceItemOthers>
    </InvoiceItem>
  )
}
