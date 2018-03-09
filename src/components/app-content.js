'use strict'

import React, {PropTypes}  from 'react'
import Search from './search'
import UserInfo from './user-info'
import Actions from './actions'
import Repos from './repos'

const AppContent = ({userinfo, repos, starred, isFetching, handleSearch, getRepos, getStarred}) => (
    <div className='app' >

        <Search isDisabled={isFetching} handleSearch={handleSearch} />

        {!!userinfo && <UserInfo userinfo={userinfo} />}

        {isFetching && <div>Carregando....</div>}

        {!!userinfo && <Actions getRepos={getRepos} getStarred={getStarred}  />}

        {!!repos.length && <Repos className='repos' title='Repositórios:' repos={repos} />}

        {!!starred.length && <Repos className='starred' title='Favoritos:' repos={starred} />}

    </div>
)

AppContent.propTypes = {
    userinfo: PropTypes.object,
    repos: PropTypes.array.isRequired,
    starred: PropTypes.array.isRequired,
    isFetching:PropTypes.bool.isRequired,
    handleSearch : React.PropTypes.func.isRequired,
    getRepos : React.PropTypes.func.isRequired,
    getStarred : React.PropTypes.func.isRequired
}

export default AppContent