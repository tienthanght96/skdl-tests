import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import {
  selectData,
  selectError,
  selectLoading,
  selectPage,
  selectTotalItems,
  setPage,
} from '../redux/appSlice'
import { TableBody } from './TableBody'
import { TableHeader } from './TableHeader'
import { TablePagination } from './TablePagination'

const LimitPerPage = 20

export const TableUsers: React.FC<{}> = () => {
  const data = useSelector(selectData)
  const error = useSelector(selectError)
  const loading = useSelector(selectLoading)
  const currentPage = useSelector(selectPage)
  const totalItems = useSelector(selectTotalItems)
  const dispatch = useDispatch()

  const startIndex = (currentPage - 1) * LimitPerPage
  const endIndex = currentPage * LimitPerPage

  const dataInPage = data.slice(startIndex, endIndex)

  const onChangePage = (page: number) => {
    dispatch(setPage(page))
  }

  return (
    <>
      <div
        className={`table-users-contaniner ${
          error || dataInPage.length === 0 || dataInPage.length < LimitPerPage
            ? 'table-users-contaniner--auto'
            : ''
        }`}
      >
        <table className="table-users">
          <TableHeader />
          <TableBody data={dataInPage} loading={loading} error={error} />
        </table>
      </div>
      <TablePagination
        totalItems={totalItems}
        page={currentPage}
        onChangePage={onChangePage}
      />
    </>
  )
}
