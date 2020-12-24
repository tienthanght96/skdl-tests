import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { useDebounce } from '../hooks/useDebound'
import { searchUsers, selectLoading, setData } from '../redux/appSlice'

export const SearchForm: React.FC<{}> = () => {
  const [query, setQuery] = React.useState('')
  const { debouncedValue } = useDebounce(query.trim())
  const firstInit = useRef(true)

  const loading = useSelector(selectLoading)
  const dispatch = useDispatch()

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value)
    if (firstInit.current) {
      firstInit.current = false
    }
  }

  useEffect(() => {
    if (firstInit.current) {
      return
    }
    if (debouncedValue.length === 0) {
      dispatch(setData([]))
      return
    }
    if (debouncedValue.length >= 3) {
      dispatch(searchUsers(debouncedValue))
    }
  }, [debouncedValue, dispatch])

  return (
    <div className="search-form">
      <label className="search-form__label" htmlFor="searchUsers">
        <span className="search-form__icon">
          <svg
            className="fill-current"
            fill="#718096"
            width="16"
            height="16"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <path d="M12.9 14.32a8 8 0 1 1 1.41-1.41l5.35 5.33-1.42 1.42-5.33-5.34zM8 14A6 6 0 1 0 8 2a6 6 0 0 0 0 12z"></path>
          </svg>
        </span>
        <input
          id="searchUser"
          placeholder="Type username..."
          value={query}
          type="text"
          autoComplete="off"
          disabled={loading}
          onChange={handleOnChange}
        />
        {loading && <div className="search-form__loading"></div>}
      </label>
    </div>
  )
}
