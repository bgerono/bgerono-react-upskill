import React, { FC, ReactElement } from 'react'
import { IconButton, TextField } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import { InvoiceItem, InvoiceItemName, InvoiceItemOthers } from './invoice-details-styled'
import { useTranslation } from 'react-i18next'

export const InvoiceDetailsItem: FC = (): ReactElement => {
  const { t } = useTranslation()

  return (
    <InvoiceItem>
      <InvoiceItemName>
        <TextField sx={{ width: '100%' }} label={t('NAME')} variant="standard" />
      </InvoiceItemName>
      <InvoiceItemOthers>
        <TextField label={t('AMOUNT')} variant="standard" />
        <TextField label={t('UNIT')} variant="standard" />
        <TextField label={t('TAX')} variant="standard" />
        <TextField label={t('PRICE')} variant="standard" />
        <IconButton aria-label="delete">
          <DeleteIcon />
        </IconButton>
      </InvoiceItemOthers>
    </InvoiceItem>
  )
}
