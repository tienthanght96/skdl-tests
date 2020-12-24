import React from 'react'

import { UserInfo } from '../interfaces'

interface Props {
  userInfo: UserInfo
}

export const TableRow: React.FC<Props> = ({ userInfo }) => (
  <tr className="table-row">
    <td className="table-cell">
      <figure>
        <img src={userInfo.avatar_url} alt={userInfo.login} />
      </figure>
    </td>
    <td className="table-cell">
      <b>{userInfo.login}</b>
    </td>
    <td className="table-cell">
      <span className="user-type">{userInfo.type}</span>
    </td>
    <td className="table-cell text-center">{userInfo.score}</td>
  </tr>
)
