import React from 'react'

export const TableHeader: React.FC<{}> = () => (
  <thead className="table-header">
    <tr className="header-row">
      <th className="text-left">Avatar</th>
      <th className="text-left">Login</th>
      <th className="text-left">Type</th>
      <th className="text-center">Score</th>
    </tr>
  </thead>
)
