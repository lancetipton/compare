import React from 'react'
import { Link, useLocation } from 'react-router-dom'

export const FilterLink: React.FC = () => {
  const { pathname } = useLocation()
  return (
    <ul className="filters">
      <li>
        <Link
          data-testid="all-filter"
          className={pathname === '/' ? 'selected' : ''}
          to="/"
        >
          All
        </Link>
      </li>
      <li>
        <Link
          data-testid="active-filter"
          className={pathname === '/active' ? 'selected' : ''}
          to="/active"
        >
          Active
        </Link>
      </li>
      <li>
        <Link
          data-testid="completed-filter"
          className={pathname === '/completed' ? 'selected' : ''}
          to="/completed"
        >
          Completed
        </Link>
      </li>
    </ul>
  )
}

