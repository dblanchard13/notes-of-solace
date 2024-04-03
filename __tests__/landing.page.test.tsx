import { render, screen } from '@testing-library/react'
import { vi } from 'vitest'
import Page from '../app/page'

vi.mock('next/font/google', () => {
  return {
    Inter: () => ({ className: 'inter' }),
  }
})

test(`Landing`, async () => {
  render(await Page())
  expect(screen.getByText('Notes of Solace')).toBeTruthy()
  expect(
    screen.getByText(
      'A simple note taking app to help you find solace in your thoughts.'
    )
  ).toBeTruthy()
  expect(screen.getByText('Go to your notes')).toBeTruthy()
})
