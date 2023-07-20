import React, { FC, ReactElement, useContext, useEffect } from 'react'
import { Button, TextField } from '@mui/material'
import {
  InvoiceForm,
  InvoiceFormDateRow,
  InvoiceFormTopRow,
  InvoiceItemButton,
  InvoiceItems,
  InvoiceOthersRow,
} from './invoice-details-styled'
import { useTranslation } from 'react-i18next'
import { InvoiceDetailsItem } from './invoice-details-item'
import { useNavigate, useParams } from 'react-router-dom'
import { useInvoiceApi } from '../../hooks/invoice-api.hooks'
import { UseQueryResult } from '@tanstack/react-query'
import { IInvoice, IInvoiceItem } from '../../models/invoice.model'
import { CompanyType, useInvoice } from '../../hooks/invoice.hooks'
import { FormProvider, SubmitHandler, useFieldArray, useForm } from 'react-hook-form'
import { InvoiceDetailsCompany } from './invoice-details-company'
import { InvoiceDetailsDatepicker } from './invoice-details-datepicker'
import { ILoaderContext, LoaderContext } from '../../context/LoaderContex'

export const InvoiceDetails: FC = (): ReactElement => {
  const { t } = useTranslation()
  const { invoiceId } = useParams()
  const { getInvoiceById, updateInvoiceById, saveNewInvoice } = useInvoiceApi()
  const { createEmptyInvoice, createEmptyInvoiceItem } = useInvoice()
  const { setLoader } = useContext(LoaderContext) as ILoaderContext
  const navigate = useNavigate()
  const invoiceQuery: UseQueryResult<IInvoice> | undefined = invoiceId
    ? getInvoiceById(invoiceId as string)
    : undefined
  const useFormMethods = useForm({ defaultValues: createEmptyInvoice() })
  const { setFocus, formState, control, register, handleSubmit } = useFormMethods
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'items',
  })
  const { isDirty, errors } = formState
  const updateMutation = updateInvoiceById()
  const saveMutation = saveNewInvoice()

  useEffect(() => {
    setFocus('name')
  }, [setFocus])

  useEffect(() => {
    if (invoiceQuery?.status === 'success') {
      useFormMethods.reset({ ...invoiceQuery?.data })
    }
  }, [invoiceQuery?.status, invoiceQuery?.data])

  useEffect(() => {
    setLoader(!!invoiceQuery?.isLoading)
  }, [invoiceQuery?.isLoading])

  const onSubmit: SubmitHandler<IInvoice> = (invoiceData: IInvoice) => {
    if (!invoiceData?.id) {
      saveMutation.mutate(invoiceData, {
        onSuccess: (data, returnedInvoice) => {
          useFormMethods.reset({ ...returnedInvoice })
        },
      })
    } else {
      updateMutation.mutate(invoiceData, {
        onSuccess: (data, invoice) => {
          useFormMethods.reset({ ...invoice })
        },
      })
    }
  }

  return (
    <FormProvider {...useFormMethods}>
      <form>
        <InvoiceForm>
          <InvoiceFormTopRow>
            <TextField
              required
              sx={{ width: '50%' }}
              id="standard-basic"
              error={!!errors?.name}
              helperText={errors?.name ? errors?.name?.message : ''}
              label={t('NAME')}
              variant="standard"
              {...register('name', {
                required: t('FIELD_IS_REQUIRE') as string,
                minLength: {
                  value: 4,
                  message: 'Field is min length 4.',
                },
              })}
            />
            <div>
              <Button
                sx={{ margin: '5px' }}
                variant="contained"
                onClick={() => navigate(`/invoices`)}
              >
                {t('CANCEL')}
              </Button>
              <Button
                sx={{ margin: '5px' }}
                variant="contained"
                disabled={!isDirty}
                onClick={handleSubmit(onSubmit)}
              >
                {t('SAVE')}
              </Button>
            </div>
          </InvoiceFormTopRow>
          <InvoiceFormDateRow>
            <InvoiceDetailsDatepicker
              controlName={'createdAt'}
              label={'CREATED_AT'}
            ></InvoiceDetailsDatepicker>
            <InvoiceDetailsDatepicker
              controlName={'validUntil'}
              label={'VALID_UNTIL'}
            ></InvoiceDetailsDatepicker>
          </InvoiceFormDateRow>
          <InvoiceOthersRow>
            <InvoiceDetailsCompany companyType={CompanyType.recipient}></InvoiceDetailsCompany>
            <InvoiceDetailsCompany companyType={CompanyType.sender}></InvoiceDetailsCompany>
          </InvoiceOthersRow>
          <InvoiceItems>
            {fields?.map((invoiceItem: IInvoiceItem, index) => {
              return (
                <InvoiceDetailsItem
                  key={`${invoiceItem?.id}${index}`}
                  invoiceItemIndex={index}
                  onInvoiceItemRemove={() => remove(index)}
                  {...register(`items.${index}` as const)}
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
