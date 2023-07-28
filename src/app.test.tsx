import { render, screen } from '@testing-library/react'
import { it, describe } from 'vitest'
import App from './app'
import { vi } from 'vitest'
import '@testing-library/jest-dom'
import React from 'react'

const mockedUsedNavigate = vi.fn()

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom')

  return { ...actual, useNavigate: () => mockedUsedNavigate }
})

/**
 * @vitest-environment jsdom
 */
describe('App', () => {
  it('should display menu items and hide backdrop loader', () => {
    render(<App />)

    expect(screen.getByText('INVOICES')).toBeDefined()
    expect(screen.getByText('ADD_NEW')).toBeDefined()
    expect(screen.getByTestId('backdrop')).not.toBeVisible()
  })
})
