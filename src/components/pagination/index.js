'use strict'

import React from 'react'
import './pagination.css'
import pagination from 'utils/pagination'
import Page from './page'

const Pagination = ({ total, activePage, pageLink, onClick }) => (
  <ul className='pagination'>
    {pagination({ total, activePage }).map((page, index) => (
      <li key={index} style={activePage === page ? { color: 'red' } : null}>
        <Page page={page} pageLink={`${pageLink}/${page}`} onClick={onClick} />
      </li>
    ))}
  </ul>
)

Pagination.defaultProps = {
  pageLink: '',
  activePage: 1
}

Pagination.propTypes = {
  total: React.PropTypes.number,
  activePage: React.PropTypes.number,
  pageLink: React.PropTypes.string,
  onClick: React.PropTypes.func
}

export default Pagination
