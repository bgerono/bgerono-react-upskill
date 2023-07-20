import React, { FC, ReactElement } from 'react'
import { IconButton, TextField } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import { InvoiceItem, InvoiceItemName, InvoiceItemOthers } from './invoice-details-styled'
import { useTranslation } from 'react-i18next'
import { useFormContext } from 'react-hook-form'
import { IInvoice } from '../../models/invoice.model'

interface IInvoiceDetailsItemProps {
  invoiceItemIndex: number
  onInvoiceItemRemove: () => void
}

export const InvoiceDetailsItem: FC<IInvoiceDetailsItemProps> = (
  invoiceDetailsItemProps,
): ReactElement => {
  const { t } = useTranslation()
  const { invoiceItemIndex, onInvoiceItemRemove } = invoiceDetailsItemProps
  const {
    register,
    formState: { errors },
  } = useFormContext<IInvoice>()
  const errorItems = errors.items

  return (
    <InvoiceItem>
      <InvoiceItemName>
        <TextField
          required
          error={!!errorItems?.[invoiceItemIndex]?.name}
          helperText={
            errorItems?.[invoiceItemIndex]?.name
              ? errorItems?.[invoiceItemIndex]?.name?.message
              : ''
          }
          sx={{ width: '100%' }}
          label={t('NAME')}
          variant="standard"
          {...register(`items.${invoiceItemIndex}.name`, {
            required: t('FIELD_IS_REQUIRE') as string,
          })}
        />
      </InvoiceItemName>
      <InvoiceItemOthers>
        <TextField
          required
          error={!!errorItems?.[invoiceItemIndex]?.amount}
          helperText={
            errorItems?.[invoiceItemIndex]?.amount
              ? errorItems?.[invoiceItemIndex]?.amount?.message
              : ''
          }
          type={'number'}
          label={t('AMOUNT')}
          variant="standard"
          {...register(`items.${invoiceItemIndex}.amount`, {
            required: t('FIELD_IS_REQUIRE') as string,
            valueAsNumber: true,
          })}
        />
        <TextField
          required
          error={!!errorItems?.[invoiceItemIndex]?.unit}
          helperText={
            errorItems?.[invoiceItemIndex]?.unit
              ? errorItems?.[invoiceItemIndex]?.unit?.message
              : ''
          }
          label={t('UNIT')}
          variant="standard"
          {...register(`items.${invoiceItemIndex}.unit`, {
            required: t('FIELD_IS_REQUIRE') as string,
          })}
        />
        <TextField
          required
          error={!!errorItems?.[invoiceItemIndex]?.tax}
          helperText={
            errorItems?.[invoiceItemIndex]?.tax ? errorItems?.[invoiceItemIndex]?.tax?.message : ''
          }
          type={'number'}
          label={t('TAX')}
          variant="standard"
          {...register(`items.${invoiceItemIndex}.tax`, {
            required: t('FIELD_IS_REQUIRE') as string,
            valueAsNumber: true,
          })}
        />
        <TextField
          required
          error={!!errorItems?.[invoiceItemIndex]?.price}
          helperText={
            errorItems?.[invoiceItemIndex]?.price
              ? errorItems?.[invoiceItemIndex]?.price?.message
              : ''
          }
          type={'number'}
          label={t('PRICE')}
          variant="standard"
          {...register(`items.${invoiceItemIndex}.price`, {
            required: t('FIELD_IS_REQUIRE') as string,
            valueAsNumber: true,
          })}
        />
        <IconButton aria-label="delete" onClick={() => onInvoiceItemRemove()}>
          <DeleteIcon />
        </IconButton>
      </InvoiceItemOthers>
    </InvoiceItem>
  )
}
