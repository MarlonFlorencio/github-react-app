'use strict'

const pagination = ({ total, activePage }) => {
  let pages = []

  for (let i = 0; i < total; i++) {
    pages.push(i + 1)
  }

  return pages
}

export default pagination
