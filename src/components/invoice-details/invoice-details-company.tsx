import React, { FC, ReactElement, useEffect } from 'react'
import { TextField } from '@mui/material'
import { useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { CompanyType } from '../../hooks/invoice.hooks'
import { InvoiceCompany } from './invoice-details-styled'
import { IInvoice } from '../../models/invoice.model'

interface IInvoiceDetailsCompanyProps {
  companyType: CompanyType
}

export const InvoiceDetailsCompany: FC<IInvoiceDetailsCompanyProps> = (
  invoiceDetailsCompanyProps,
): ReactElement => {
  const { t } = useTranslation()
  const { register, formState } = useFormContext<IInvoice>()
  const { companyType } = invoiceDetailsCompanyProps
  let companyErrors = formState.errors[companyType]

  useEffect(() => {
    companyErrors = formState.errors[companyType]
  }, [formState.errors, companyType])

  return (
    <InvoiceCompany>
      <div>{companyType === CompanyType.recipient ? t('RECIPIENT') : t('SENDER')}</div>
      <TextField
        required
        error={!!companyErrors?.companyName}
        helperText={companyErrors?.companyName ? companyErrors?.companyName?.message : ''}
        label={t('COMPANY_NAME')}
        variant="standard"
        {...register(`${companyType}.companyName`, { required: t('FIELD_IS_REQUIRE') as string })}
      />
      <TextField
        required
        error={!!companyErrors?.city}
        helperText={companyErrors?.city ? companyErrors?.city?.message : ''}
        label={t('CITY')}
        variant="standard"
        {...register(`${companyType}.city`, { required: t('FIELD_IS_REQUIRE') as string })}
      />
      <TextField
        required
        error={!!companyErrors?.street}
        helperText={companyErrors?.street ? companyErrors?.street?.message : ''}
        label={t('STREET')}
        variant="standard"
        {...register(`${companyType}.street`, { required: t('FIELD_IS_REQUIRE') as string })}
      />
      <TextField
        required
        error={!!companyErrors?.postcode}
        helperText={companyErrors?.postcode ? companyErrors?.postcode?.message : ''}
        label={t('POSTCODE')}
        variant="standard"
        {...register(`${companyType}.postcode`, { required: t('FIELD_IS_REQUIRE') as string })}
      />
      <TextField
        required
        error={!!companyErrors?.nip}
        helperText={companyErrors?.nip ? companyErrors?.nip?.message : ''}
        label="NIP"
        variant="standard"
        {...register(`${companyType}.nip`, { required: t('FIELD_IS_REQUIRE') as string })}
      />
      <TextField
        required
        error={!!companyErrors?.email}
        helperText={companyErrors?.email ? companyErrors?.email?.message : ''}
        label="E-mail"
        variant="standard"
        {...register(`${companyType}.email`, { required: t('FIELD_IS_REQUIRE') as string })}
      />
      <TextField
        required
        error={!!companyErrors?.bankAccount}
        helperText={companyErrors?.bankAccount ? companyErrors?.bankAccount?.message : ''}
        label={t('BANK_ACCOUNT')}
        variant="standard"
        {...register(`${companyType}.bankAccount`, { required: t('FIELD_IS_REQUIRE') as string })}
      />
    </InvoiceCompany>
  )
}
