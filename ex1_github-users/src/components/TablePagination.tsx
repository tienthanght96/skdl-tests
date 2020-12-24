import React from 'react'

interface Props {
  totalItems: number
  page: number
  onChangePage: (page: number) => void
}

const LimitPerPage = 20

export const TablePagination: React.FC<Props> = ({
  page,
  totalItems,
  onChangePage,
}) => {
  const totalPages = Math.ceil(totalItems / LimitPerPage)
  const pages = Array.from(Array(totalPages).keys())

  const clickPage = (newPage: number) => (
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    event.preventDefault()
    if (newPage === page || newPage > totalPages || newPage < 1) {
      return
    }
    onChangePage(newPage)
  }

  if (!pages.length || pages.length === 1) {
    return null
  }

  return (
    <ul className="table-pagination">
      {pages.map((index) => (
        <li key={'page-' + index + 1}>
          <a
            href={`/page/${page + index}`}
            className={`pagination-link-item ${
              page === index + 1 ? 'pagination-link-item--active' : ''
            }`}
            onClick={clickPage(index + 1)}
          >
            {index + 1}
          </a>
        </li>
      ))}
      <li>
        <a
          href="#prev"
          className="pagination-link-item"
          onClick={clickPage(page - 1)}
        >
          Prev
        </a>
      </li>
      <li>
        <a
          href="#next"
          className="pagination-link-item"
          onClick={clickPage(page + 1)}
        >
          Next
        </a>
      </li>
    </ul>
  )
}
