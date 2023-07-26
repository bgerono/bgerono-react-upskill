import { fireEvent, render } from '@testing-library/react'
import { it, describe } from 'vitest'
import { vi } from 'vitest'
import '@testing-library/jest-dom'
import React from 'react'
import { InvoiceListItem } from './invoice-list-item'
import { IInvoice } from '../../models/invoice.model'
import { newInvoiceMock } from '../../hooks/invoice.hooks'
import { useInvoiceApi } from '../../hooks/invoice-api.hooks'

const mockedUsedNavigate = vi.fn()

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom')

  return { ...actual, useNavigate: () => mockedUsedNavigate }
})
vi.mock('../../hooks/invoice-api.hooks', () => ({
  useInvoiceApi: vi
    .fn()
    .mockReturnValue({ removeInvoiceById: vi.fn().mockReturnValue({ mutate: vi.fn() }) }),
}))

const invoicePromise: Promise<IInvoice> = new Promise((resolve) => resolve(newInvoiceMock))
const refetchSpy = vi.fn().mockReturnValue(invoicePromise)

/**
 * @vitest-environment jsdom
 */
describe('InvoiceListItem', () => {
  it('should display invoice fields with data', () => {
    const { getByTestId, getByText } = render(
      <InvoiceListItem invoice={{ id: '123asd', ...newInvoiceMock }} refetchList={refetchSpy} />,
    )

    expect(getByText(newInvoiceMock.name)).toBeVisible()
    expect(getByText(newInvoiceMock.createdAt)).toBeVisible()
    expect(getByText(newInvoiceMock.validUntil)).toBeVisible()
    expect(getByTestId('list-item-button-remove')).toBeVisible()
  })

  it('should remove item when user clicked remove button', () => {
    const { getByTestId } = render(
      <InvoiceListItem invoice={{ id: '123asd', ...newInvoiceMock }} refetchList={refetchSpy} />,
    )

    fireEvent.click(getByTestId('list-item-button-remove'))

    expect(useInvoiceApi().removeInvoiceById().mutate).toHaveBeenCalled()
    expect(getByTestId('list-item-button-remove')).toBeDisabled()
  })

  it('should display count amount in amount field', () => {
    const { getByTestId } = render(
      <InvoiceListItem invoice={{ id: '123asd', ...newInvoiceMock }} refetchList={refetchSpy} />,
    )

    expect(getByTestId('list-item-amount').textContent).toEqual('23')
  })
})
