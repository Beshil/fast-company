import { combineReducers, configureStore } from '@reduxjs/toolkit'
import qualitiesReducer from './qualities'

const rootReuser = combineReducers({ qualitiesReducer })

export function createStore() {
  return configureStore({
    reducer: rootReuser
  })
}
