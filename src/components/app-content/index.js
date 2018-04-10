'use strict'

import React from 'react'
import Search from 'components/search'
import UserInfo from 'components/user-info'
import Actions from 'components/actions'
import Repos from 'components/repos'
import './app-content.css'

const AppContent = ({ userinfo, repos, starred, isFetching, handleSearch, getRepos, getStarred }) => (
  <div className='app' >

    <Search isDisabled={isFetching} handleSearch={handleSearch} />

    {!!userinfo && <UserInfo userinfo={userinfo} />}

    {isFetching && <div>Carregando....</div>}

    {!!userinfo && <Actions getRepos={getRepos} getStarred={getStarred} />}

    {!!repos.length && <Repos className='repos' title='Repositórios:' repos={repos} />}

    {!!starred.length && <Repos className='starred' title='Favoritos:' repos={starred} />}

  </div>
)

AppContent.propTypes = {
  userinfo: React.PropTypes.object,
  repos: React.PropTypes.array.isRequired,
  starred: React.PropTypes.array.isRequired,
  isFetching: React.PropTypes.bool.isRequired,
  handleSearch: React.PropTypes.func.isRequired,
  getRepos: React.PropTypes.func.isRequired,
  getStarred: React.PropTypes.func.isRequired
}

export default AppContent
