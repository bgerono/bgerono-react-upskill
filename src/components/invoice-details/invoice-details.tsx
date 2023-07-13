import React, { FC, ReactElement, useEffect, useRef } from 'react'
import { Button, CircularProgress, TextField } from '@mui/material'
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
import { useTranslation } from 'react-i18next'
import { InvoiceDetailsItem } from './invoice-details-item'
import { useNavigate, useParams } from 'react-router-dom'
import { useInvoiceApi } from '../../hooks/invoice-api.hooks'
import { UseQueryResult } from '@tanstack/react-query'
import { IInvoice, IInvoiceItem } from '../../models/invoice.model'
import { useInvoice } from '../../hooks/invoice.hooks'
import { FormProvider, SubmitHandler, useFieldArray, useForm } from 'react-hook-form'

export const InvoiceDetails: FC = (): ReactElement => {
  const { invoiceId } = useParams()
  const { t } = useTranslation()
  const { getInvoiceById, updateInvoiceById } = useInvoiceApi()
  const { createEmptyInvoice, createEmptyInvoiceItem } = useInvoice()
  const navigate = useNavigate()
  const invoiceQuery: UseQueryResult<IInvoice> = getInvoiceById(invoiceId as string)
  const nameInput = useRef<HTMLInputElement>(null)
  // const [invoice, setInvoice] = useState<IInvoice>(createEmptyInvoice())
  const methods = useForm({ defaultValues: createEmptyInvoice() })
  const { formState, control, register, handleSubmit } = methods
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'items',
  })
  const { isDirty } = formState

  useEffect(() => {
    nameInput?.current?.focus()

    if (invoiceQuery.status === 'success') {
      // setInvoice(invoiceQuery.data)
      methods.reset({ ...invoiceQuery.data })
    }
  }, [invoiceQuery.status, invoiceQuery.data])

  if (invoiceQuery.isLoading) {
    return <CircularProgress />
  }

  // const updateMutation = updateInvoiceById()*/

  const onSubmit: SubmitHandler<IInvoice> = (invoiceData: IInvoice) => {
    console.log('!!!!!!!!!', invoiceData)
    // updateMutation.mutate(invoiceData, {
    //   onSuccess: () => console.log('!!!!!!!!!', invoiceData),
    // })
  }

  return (
    <FormProvider {...methods}>
      <form>
        <InvoiceForm>
          <InvoiceFormTopRow>
            <TextField
              sx={{ width: '50%' }}
              id="standard-basic"
              inputRef={nameInput}
              label={t('NAME')}
              variant="standard"
              {...register('name')}
            />
            <div>
              <Button
                sx={{ margin: '5px' }}
                variant="contained"
                onClick={() => navigate(`/invoices`)}
              >
                {t('CANCEL')}
              </Button>
              <Button sx={{ margin: '5px' }} variant="contained" onClick={handleSubmit(onSubmit)}>
                {t('SAVE')}
              </Button>
            </div>
          </InvoiceFormTopRow>
          <InvoiceFormDateRow>
            <DatePicker label="Create date" />
            <DatePicker label="Valid until date" />
          </InvoiceFormDateRow>
          <InvoiceOthersRow>
            <Recipient>
              <div>{t('RECIPIENT')}</div>
              <TextField
                label={t('COMPANY_NAME')}
                variant="standard"
                {...register('recipient.companyName')}
              />
              <TextField label={t('CITY')} variant="standard" {...register('recipient.city')} />
              <TextField label={t('STREET')} variant="standard" {...register('recipient.street')} />
              <TextField
                label={t('POSTCODE')}
                variant="standard"
                {...register('recipient.postcode')}
              />
              <TextField label="NIP" variant="standard" {...register('recipient.nip')} />
              <TextField label="E-mail" variant="standard" {...register('recipient.email')} />
              <TextField
                label={t('BANK_ACCOUNT')}
                variant="standard"
                {...register('recipient.bankAccount')}
              />
            </Recipient>
            <Sender>
              <div>{t('SENDER')}</div>
              <TextField
                label={t('COMPANY_NAME')}
                variant="standard"
                {...register('sender.companyName')}
              />
              <TextField label={t('CITY')} variant="standard" {...register('sender.city')} />
              <TextField label={t('STREET')} variant="standard" {...register('sender.street')} />
              <TextField
                label={t('POSTCODE')}
                variant="standard"
                {...register('sender.postcode')}
              />
              <TextField label="NIP" variant="standard" {...register('sender.nip')} />
              <TextField label="E-mail" variant="standard" {...register('sender.email')} />
              <TextField
                label={t('BANK_ACCOUNT')}
                variant="standard"
                {...register('sender.bankAccount')}
              />
            </Sender>
          </InvoiceOthersRow>
          <InvoiceItems>
            {fields?.map((invoiceItem: IInvoiceItem, index) => {
              return (
                <InvoiceDetailsItem
                  key={invoiceItem.id}
                  invoiceItemIndex={index}
                  onInvoiceItemRemove={() => remove(index)}
                  {...register(`items.${index}`)}
                ></InvoiceDetailsItem>
              )
            })}
            <InvoiceItemButton>
              <Button variant="contained" onClick={() => append(createEmptyInvoiceItem())}>
                {t('ADD_ITEM')}
              </Button>
            </InvoiceItemButton>
          </InvoiceItems>
        </InvoiceForm>
      </form>
    </FormProvider>
  )
}
