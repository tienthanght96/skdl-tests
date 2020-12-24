import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AxiosError } from 'axios'

import { UserInfo } from '../interfaces'
import { ApiService } from '../services/api'
import { AppThunk, RootState } from './store'

interface AppState {
  page: number
  error: string
  loading: boolean
  data: UserInfo[]
  cachedData: Record<string, UserInfo[]>
}

const initialState: AppState = {
  page: 1,
  error: '',
  loading: false,
  data: [],
  cachedData: {},
}

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload
    },
    setData: (state, action: PayloadAction<UserInfo[]>) => {
      state.loading = false
      state.error = ''
      state.page = 1
      state.data = action.payload
    },
    setPage: (state, action: PayloadAction<number>) => {
      state.page = action.payload
    },
    setCachedData: (
      state,
      action: PayloadAction<{ query: string; data: UserInfo[] }>
    ) => {
      state.cachedData[action.payload.query] = action.payload.data
    },
  },
})

export const {
  setData,
  setError,
  setLoading,
  setPage,
  setCachedData,
} = appSlice.actions

export const searchUsers = (query: string): AppThunk => async (
  dispatch,
  getState
) => {
  const currentState = getState()
  const isCached = Array.isArray(currentState.app.cachedData[query])
  if (isCached) {
    dispatch(setData(currentState.app.cachedData[query]))
    return
  }
  dispatch(setError(''))
  dispatch(setLoading(true))
  try {
    const { data } = await ApiService.searchUsers(query)
    dispatch(setData(data.items))
    dispatch(setCachedData({ data: data.items, query }))
  } catch (error) {
    const messge =
      String((error as AxiosError).response?.data.message) ||
      'Load users failed!'
    dispatch(setData([]))
    dispatch(setError(messge))
    dispatch(setLoading(false))
  }
}

export const selectLoading = (state: RootState) => state.app.loading

export const selectData = (state: RootState) => state.app.data

export const selectError = (state: RootState) => state.app.error

export const selectPage = (state: RootState) => state.app.page

export const selectTotalItems = (state: RootState) => state.app.data.length

export const appReducer = appSlice.reducer
