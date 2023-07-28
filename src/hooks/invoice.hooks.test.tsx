import { it, describe } from 'vitest'
import '@testing-library/jest-dom'
import { useInvoice } from './invoice.hooks'

/**
 * @vitest-environment jsdom
 */
describe('useInvoice', () => {
  const { countInvoiceAmount } = useInvoice()
  it('countInvoiceAmount: should return 0 when invoice collection is undefined', () => {
    const result = countInvoiceAmount(undefined)

    expect(result).toEqual(0)
  })

  it('countInvoiceAmount: should return 0 when invoice collection is empty', () => {
    const result = countInvoiceAmount([])

    expect(result).toEqual(0)
  })

  it('countInvoiceAmount: should count total amount from provided invoice', () => {
    const expectedAmount = 25
    const result = countInvoiceAmount([
      { name: 'invoice 1', tax: 12, price: 10, unit: 'unit', amount: 12 },
      { name: 'invoice 2', tax: 12, price: 10, unit: 'unit', amount: 13 },
    ])

    expect(result).toEqual(expectedAmount)
  })
})
