import { validator } from './validator'
const config = { content: { isRequired: { message: 'required' } } }
test.each([
  {},
  undefined,
  { content: '' },
  { content: '   ' },
  { content: null }
])('rejects absent or blank content: %p', (data) => {
  expect(validator(data, config)).toEqual({ content: 'required' })
})
test('accepts nonempty text and checks consent', () => {
  expect(validator({ content: 'Hello' }, config)).toEqual({})
  expect(validator({ consent: false }, { consent: config.content })).toEqual({
    consent: 'required'
  })
})
