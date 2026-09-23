import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { Provider } from 'react-redux'
import { MemoryRouter } from 'react-router-dom'
import { createStore } from '../../../store/createStore'
import UsersListPage from './usersListPage'
jest.mock('../../../services/http.service', () => ({}))
test('profession filtering matches IDs and search clears the selected profession', () => {
  const store = createStore()
  store.dispatch({
    type: 'users/authRequestSuccess',
    payload: { userId: 'me' }
  })
  store.dispatch({
    type: 'users/usersReceived',
    payload: [
      { _id: 'me', name: 'Current', profession: 'doctor', qualities: [] },
      { _id: 'a', name: 'Alice', profession: 'doctor', qualities: [] },
      { _id: 'b', name: 'Bob', profession: 'writer', qualities: [] }
    ]
  })
  store.dispatch({
    type: 'professions/professionsReceived',
    payload: [
      { _id: 'doctor', name: 'Doctor' },
      { _id: 'writer', name: 'Writer' }
    ]
  })
  store.dispatch({ type: 'qualities/qualitiesReceived', payload: [] })
  render(
    <Provider store={store}>
      <MemoryRouter>
        <UsersListPage />
      </MemoryRouter>
    </Provider>
  )
  expect(screen.queryByText('Current')).toBeNull()
  fireEvent.click(screen.getByText('Doctor', { selector: 'li' }))
  expect(screen.getByText('Alice')).toBeInTheDocument()
  expect(screen.queryByText('Bob')).toBeNull()
  fireEvent.change(screen.getByPlaceholderText('Search...'), {
    target: { value: 'bob' }
  })
  expect(screen.getByText('Bob')).toBeInTheDocument()
  expect(screen.queryByText('Alice')).toBeNull()
})
