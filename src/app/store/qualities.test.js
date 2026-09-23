import { getQualitiesByIds } from './qualities'
test('profiles with no qualities remain valid when Firebase omits an empty array', () => {
  const state = { qualities: { entities: [{ _id: 'one', name: 'Kind' }] } }
  expect(getQualitiesByIds(undefined)(state)).toEqual([])
  expect(getQualitiesByIds(null)(state)).toEqual([])
  expect(getQualitiesByIds(['one'])(state)).toEqual(state.qualities.entities)
})
