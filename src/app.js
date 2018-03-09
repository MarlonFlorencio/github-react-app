'use strict'

import React, { Component } from 'react'
import AppContent from './components/app-content'
import ajax from '@fdaciuk/ajax'

class App extends Component {

    constructor() {
        super();
        this.state = {
            userinfo: null,
            repos: [],
            starred: []
        }
    }

    getGitHubApiUrl (username, type) {
        const internalUser = username ? `/${username}` : ''
        const internalType = type ? `/${type}` : ''
        return `https://api.github.com/users${internalUser}${internalType}`
    }

    handleSearch(e) {
        const value = e.target.value
        const keyCode = e.which || e.keyCode
        const ENTER = 13

        if (keyCode === ENTER) {
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
                        repos: [],
                        starred: []

                    })
                }).catch((response, xhr) => {
                    this.setState({
                        userinfo: null,
                        repos: [],
                        starred: []
                    })
                })
        }
    }

    

    getRepos(type) {
        return (e) => {
            ajax().get(this.getGitHubApiUrl(this.state.userinfo.login, type))
                .then((result) => {
                    this.setState({
                        [type]: result.map((repo) => ({
                            name: repo.name,
                            link: repo.html_url
                        }))
                    })
                })
        }
    }

    render() {

        return (

            <AppContent
                userinfo={this.state.userinfo}
                repos={this.state.repos}
                starred={this.state.starred}
                handleSearch={(e) => this.handleSearch(e)}
                getRepos={this.getRepos('repos')}
                getStarred={this.getRepos('starred')}
            />

        )
    }
}


export default App
