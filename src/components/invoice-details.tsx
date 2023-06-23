import React, { useEffect, useRef } from 'react'
import { Button, TextField } from '@mui/material'
import { DatePicker } from '@mui/x-date-pickers'
import {
  InvoiceForm,
  InvoiceFormDateRow,
  InvoiceFormTopRow,
  InvoiceItemButton,
  InvoiceItems,
  InvoiceOthersRow,
  Recipient,
  Sender,
} from './invoice-details-styled'
import InvoiceDetailsItem from './invoice-details-item'
import { useTranslation } from 'react-i18next'
import { useInvoice } from '../hooks/invoice.hooks'

export default function InvoiceDetails() {
  const { t } = useTranslation()
  const numberInput = useRef<HTMLInputElement>(null)

  useEffect(() => {
    numberInput.current?.focus()
  }, [])

  const setValue = () => {
    // console.log('------- set create date: ', newValue) // newValue: Dayjs
  }

  const addItem = () => {
    // event: React.MouseEvent<HTMLButtonElement>
    useInvoice('', null, '', '')
  }

  return (
    <InvoiceForm>
      <InvoiceFormTopRow>
        <TextField
          sx={{ width: '50%' }}
          id="standard-basic"
          inputRef={numberInput}
          label={t('NUMBER')}
          variant="standard"
        />
        <div>
          <Button sx={{ margin: '5px' }} variant="contained">
            {t('CANCEL')}
          </Button>
          <Button sx={{ margin: '5px' }} variant="contained">
            {t('SAVE')}
          </Button>
        </div>
      </InvoiceFormTopRow>
      <InvoiceFormDateRow>
        <DatePicker label="Create date" onChange={() => setValue()} />
        <DatePicker label="Valid until date" />
      </InvoiceFormDateRow>
      <InvoiceOthersRow>
        <Recipient>
          <div>{t('RECIPIENT')}</div>
          <TextField label={t('COMPANY_NAME')} variant="standard" />
          <TextField label={t('CITY')} variant="standard" />
          <TextField label={t('STREET')} variant="standard" />
          <TextField label={t('POSTCODE')} variant="standard" />
          <TextField label="NIP" variant="standard" />
          <TextField label="E-mail" variant="standard" />
          <TextField label={t('BANK_ACCOUNT')} variant="standard" />
        </Recipient>
        <Sender>
          <div>{t('SENDER')}</div>
          <TextField label={t('COMPANY_NAME')} variant="standard" />
          <TextField label={t('CITY')} variant="standard" />
          <TextField label={t('STREET')} variant="standard" />
          <TextField label={t('POSTCODE')} variant="standard" />
          <TextField label="NIP" variant="standard" />
          <TextField label="E-mail" variant="standard" />
          <TextField label={t('BANK_ACCOUNT')} variant="standard" />
        </Sender>
      </InvoiceOthersRow>
      <InvoiceItems>
        <InvoiceDetailsItem></InvoiceDetailsItem>
        <InvoiceDetailsItem></InvoiceDetailsItem>
        <InvoiceItemButton>
          <Button variant="contained" onClick={addItem}>
            {t('ADD_ITEM')}
          </Button>
        </InvoiceItemButton>
      </InvoiceItems>
    </InvoiceForm>
  )
}
