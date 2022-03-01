import { createSlice } from '@reduxjs/toolkit'
import qualitiesService from '../services/quality.service'

const qualitiesSlice = createSlice({
  name: 'qualities',
  initialState: {
    entities: null,
    isLoading: true,
    error: null
  },
  reducers: {
    qualitiesRequested: (state) => {
      state.isLoading = true
    },
    qualitiesReceved: (state, action) => {
      state.entities = action.payload
      state.isLoading = false
    },
    qualitiesRequestFiled: (state, action) => {
      state.error = action.payload
      state.isLoading = false
    }
  }
})

const { reducer: qualitiesReducer, actions } = qualitiesSlice

const { qualitiesRequested, qualitiesReceved, qualitiesRequestFiled } = actions

export const loadQualitiesList = () => async (dispatch) => {
  dispatch(qualitiesRequested())
  try {
    const { content } = await qualitiesService.get()
    dispatch(qualitiesReceved(content))
  } catch (error) {
    dispatch(qualitiesRequestFiled(error.message))
  }
}

export const getQualities = () => (state) => {
  console.log(state)
  return state.qualitiesReducer.entities
}

export const getQualitiesLoadingStatus = () => (state) =>
  state.qualitiesReducer.isLoading

export const getQualitiesByIds = (qualitiesIds) => (state) => {
  if (state.qualitiesReducer.entities) {
    const qualitiesArray = []
    for (const qualId of qualitiesIds) {
      for (const quality of state.qualitiesReducer.entities) {
        if (quality._id === qualId) {
          qualitiesArray.push(quality)
          break
        }
      }
    }
    return qualitiesArray
  }
  return []
}

export default qualitiesReducer