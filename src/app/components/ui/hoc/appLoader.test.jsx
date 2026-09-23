import React from 'react'
import { render, screen, act } from '@testing-library/react'
import { Provider } from 'react-redux'
import { createStore } from '../../../store/createStore'
import AppLoader from './appLoader'
import RegisterForm from '../registerForm'
import qualityService from '../../../services/quality.service'
import professionService from '../../../services/profession.service'
jest.mock('../../../config', () => ({ isConfigured: true }))
jest.mock('../../../services/quality.service', () => ({ fetchAll: jest.fn() }))
jest.mock('../../../services/profession.service', () => ({ get: jest.fn() }))
test('cold registration waits for both dictionaries instead of mapping null', async () => {
  let resolveQualities, resolveProfessions
  qualityService.fetchAll.mockImplementation(
    () =>
      new Promise((resolve) => {
        resolveQualities = resolve
      })
  )
  professionService.get.mockImplementation(
    () =>
      new Promise((resolve) => {
        resolveProfessions = resolve
      })
  )
  render(
    <Provider store={createStore()}>
      <AppLoader>
        <RegisterForm />
      </AppLoader>
    </Provider>
  )
  expect(screen.getByRole('status')).toBeInTheDocument()
  expect(screen.queryByText('Submit')).toBeNull()
  await act(async () => {
    resolveQualities({ content: null })
  })
  expect(screen.queryByText('Submit')).toBeNull()
  await act(async () => {
    resolveProfessions({ content: [{ _id: 'p', name: 'Doctor' }] })
  })
  expect(screen.getByText('Submit')).toBeInTheDocument()
  expect(screen.getByText('Doctor')).toBeInTheDocument()
})
