import React from 'react'

import { UserInfo } from '../interfaces'
import { TableRow } from './TableRow'

interface Props {
  data: UserInfo[]
  loading: boolean
  error: string
}

export const TableBody: React.FC<Props> = ({ data, loading, error }) => {
  if (loading) {
    return (
      <tbody className="table-body">
        {Array.from(Array(9).keys()).map((item) => (
          <tr key={'loading-' + item} className="table-row table-row--loading">
            <td className="table-cell">
              <div className="avatar-loading"></div>
            </td>
            <td className="table-cell">
              <div className="rectangle-loading"></div>
            </td>
            <td className="table-cell">
              <div className="rectangle-loading"></div>
            </td>
            <td className="table-cell text-center">
              <div className="rectangle-loading"></div>
            </td>
          </tr>
        ))}
      </tbody>
    )
  }

  if (error || !data || !data.length) {
    return (
      <tbody className="table-body">
        <tr className="table-row table-row--error">
          <td className="table-cell" colSpan={4}>
            <div className="error-message text-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24"
                viewBox="0 0 24 24"
                width="24"
                fill="#f56565"
              >
                <path d="M11 15h2v2h-2v-2zm0-8h2v6h-2V7zm.99-5C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z" />
              </svg>
              <span>{error ? error : 'Empty users!'}</span>
            </div>
          </td>
        </tr>
      </tbody>
    )
  }

  return (
    <tbody className="table-body">
      {data.map((userInfo) => (
        <TableRow key={userInfo.id} userInfo={userInfo} />
      ))}
    </tbody>
  )
}
