import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import AddCommentForm from './addCommentForm'
test('blocks an untouched empty form and retains text after failed save', async () => {
  const submit = jest.fn().mockResolvedValue(false)
  render(<AddCommentForm onSubmit={submit} />)
  fireEvent.click(screen.getByText('Опубликовать'))
  expect(submit).not.toHaveBeenCalled()
  const input = screen.getByRole('textbox')
  fireEvent.change(input, { target: { value: 'Keep this text' } })
  fireEvent.click(screen.getByText('Опубликовать'))
  await waitFor(() => expect(submit).toHaveBeenCalledTimes(1))
  await screen.findByText(
    'Не удалось сохранить комментарий. Попробуйте ещё раз.'
  )
  expect(input.value).toBe('Keep this text')
})
test('clears text only after a successful save', async () => {
  render(<AddCommentForm onSubmit={() => Promise.resolve(true)} />)
  const input = screen.getByRole('textbox')
  fireEvent.change(input, { target: { value: 'Saved text' } })
  fireEvent.click(screen.getByText('Опубликовать'))
  await waitFor(() => expect(input.value).toBe(''))
})
