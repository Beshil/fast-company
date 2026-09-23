import { configureStore } from '@reduxjs/toolkit'
import reducer, {
  loadCommentsList,
  createComment,
  removeComment
} from './comments'
import service from '../services/comment.service'
jest.mock('../services/comment.service', () => ({
  getComments: jest.fn(),
  createComment: jest.fn(),
  removeComment: jest.fn()
}))
const makeStore = () => configureStore({ reducer: { comments: reducer } })
beforeEach(() => jest.clearAllMocks())
test('a slow previous profile response cannot overwrite the current comments', async () => {
  const store = makeStore()
  let resolveFirst
  service.getComments
    .mockImplementationOnce(
      () =>
        new Promise((resolve) => {
          resolveFirst = resolve
        })
    )
    .mockResolvedValueOnce({ content: [{ _id: 'b', pageId: 'B' }] })
  const first = store.dispatch(loadCommentsList('A'))
  await store.dispatch(loadCommentsList('B'))
  resolveFirst({ content: [{ _id: 'a', pageId: 'A' }] })
  await first
  expect(store.getState().comments.entities).toEqual([
    { _id: 'b', pageId: 'B' }
  ])
})
test('blank comments are never sent to the API', async () => {
  const store = makeStore()
  expect(await store.dispatch(createComment({}, 'A', 'me'))).toBe(false)
  expect(service.createComment).not.toHaveBeenCalled()
})
test('failed create and delete expose an error without losing existing comments', async () => {
  const store = makeStore()
  service.getComments.mockResolvedValue({
    content: [{ _id: 'one', pageId: 'A' }]
  })
  await store.dispatch(loadCommentsList('A'))
  service.createComment.mockRejectedValue(new Error('offline'))
  expect(
    await store.dispatch(createComment({ content: 'hello' }, 'A', 'me'))
  ).toBe(false)
  expect(store.getState().comments.error).toMatch('сохранить')
  service.removeComment.mockRejectedValue(new Error('offline'))
  expect(await store.dispatch(removeComment('one'))).toBe(false)
  expect(store.getState().comments.entities).toHaveLength(1)
  expect(store.getState().comments.error).toMatch('удалить')
})
