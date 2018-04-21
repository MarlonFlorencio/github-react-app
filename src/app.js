'use strict'

import React, { Component } from 'react'
import AppContent from 'components/app-content'
import ajax from '@fdaciuk/ajax'

const initialReposState = {
  repos: [],
  pagination: {
    total: 1,
    activePage: 1
  }
}

class App extends Component {
  constructor () {
    super()
    this.perPage = 3
    this.state = {
      userinfo: null,
      repos: initialReposState,
      starred: initialReposState,
      isFetching: false
    }
  }

  getGitHubApiUrl (username, type, page = 1) {
    const internalUser = username ? `/${username}` : ''
    const internalType = type ? `/${type}` : ''
    const url = `https://api.github.com/users${internalUser}${internalType}?per_page=${this.perPage}&page=${page}`
    console.log(url)
    return url
  }

  handleSearch (e) {
    const value = e.target.value
    const keyCode = e.which || e.keyCode
    const ENTER = 13

    if (keyCode === ENTER) {
      this.setState({ isFetching: true })
      ajax().get(this.getGitHubApiUrl(value))
        .then((result) => {
          this.setState({
            userinfo: {
              login: result.login,
              userName: result.name,
              photo: result.avatar_url,
              repos: result.public_repos,
              followers: result.followers,
              following: result.following
            },
            repos: initialReposState,
            starred: initialReposState
          })
        }).always(() => {
          this.setState({ isFetching: false })
        })
    }
  }

  getRepos (type, page) {
    return (e) => {
      const username = this.state.userinfo.login
      ajax().get(this.getGitHubApiUrl(username, type, page))
        .then((result, xhr) => {
          const linkHeader = xhr.getResponseHeader('Link') || ''
          const totalPagesMatch = linkHeader.match(/&page=(\d+)>; rel="last/)

          this.setState({
            [type]: {
              repos: result.map((repo) => ({
                name: repo.name,
                link: repo.html_url
              })),
              pagination: {
                total: totalPagesMatch ? +totalPagesMatch[1] : this.state[type].pagination.total,
                activePage: page
              }
            }
          })
        })
    }
  }

  render () {
    return (
      <AppContent
        {...this.state}
        handleSearch={(e) => this.handleSearch(e)}
        handlePagination={(type, page) => this.getRepos(type, page)()}
        getRepos={this.getRepos('repos')}
        getStarred={this.getRepos('starred')}
      />
    )
  }
}

export default App
