import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { it, describe } from 'vitest'
import { vi } from 'vitest'
import '@testing-library/jest-dom'
import { Navbar } from './navbar'
import React from 'react'
import { useTranslation } from 'react-i18next'

const mockedUsedNavigate = vi.fn()

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom')

  return { ...actual, useNavigate: () => mockedUsedNavigate }
})

vi.mock('react-i18next', () => ({
  useTranslation: vi
    .fn()
    .mockReturnValue({ t: vi.fn((str) => str), i18n: { changeLanguage: vi.fn() } }),
}))

/**
 * @vitest-environment jsdom
 */
describe('Navbar', () => {
  it('should display menu items and lang select', () => {
    render(<Navbar />)

    expect(screen.getByText('INVOICES')).toBeDefined()
    expect(screen.getByText('ADD_NEW')).toBeDefined()
  })

  it('should call i18n change language when user choose select lang', async () => {
    const { getByText } = render(<Navbar />)

    vi.spyOn(useTranslation().i18n, 'changeLanguage').mockReturnValue(
      new Promise(() => {
        return 'pl'
      }),
    )

    fireEvent.mouseDown(getByText('EN'))
    await waitFor(() => {
      return fireEvent.click(getByText('PL'))
    })

    expect(useTranslation().i18n.changeLanguage).toHaveBeenCalledWith('pl')
  })
})
