'use strict'

import { storiesOf } from '@kadira/storybook'
import React from 'react'
import Pagination from './index'

const stories = storiesOf('Pagination', module)

stories.add('without props', () => (
  <Pagination />
))

stories.add('with total and activePage', () => (
  <Pagination total={10} activePage={5} />
))

stories.add('with page link', () => (
  <Pagination total={10} activePage={5} pageLink='http://teste.com/page' />
))

stories.add('with callback', () => (
  <Pagination total={10} activePage={5} onClick={(page) => {
    window.alert(page)
  }} />
))
