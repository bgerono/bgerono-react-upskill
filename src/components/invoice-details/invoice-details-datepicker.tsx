import React, { FC, ReactElement } from 'react'
import { Controller, useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { IInvoice, InvoiceDateFormat } from '../../models/invoice.model'
import { DatePicker } from '@mui/x-date-pickers'
import dayjs from 'dayjs'

interface IInvoiceDetailsDatepickerProps {
  controlName: keyof IInvoice
  label: string
}

export const InvoiceDetailsDatepicker: FC<IInvoiceDetailsDatepickerProps> = (
  invoiceDetailsDatepickerProps,
): ReactElement => {
  const { t } = useTranslation()
  const { control } = useFormContext<IInvoice>()
  const { controlName, label } = invoiceDetailsDatepickerProps

  return (
    <Controller
      control={control}
      rules={{ required: t('FIELD_IS_REQUIRE') as string }}
      name={controlName}
      render={({ fieldState: { error }, field: { onChange, value, ...rest } }) => (
        <DatePicker
          {...rest}
          label={t(label)}
          value={value === '' ? null : dayjs(value as string)}
          format={InvoiceDateFormat}
          onChange={(value) => {
            onChange(value?.toDate().toISOString() as string)
          }}
          slotProps={{
            textField: {
              variant: 'standard',
              error: !!error,
              helperText: error ? error.message : '',
              required: true,
            },
          }}
        />
      )}
    />
  )
}
