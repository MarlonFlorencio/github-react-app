'use strict'

import React, { Component } from 'react'
import AppContent from './components/app-content'
import ajax from '@fdaciuk/ajax'

class App extends Component {

    constructor() {
        super();
        this.state = {
            userinfo:null,
            repos: [],
            starred: []
        }
    }

    handleSearch (e) {
        const value = e.target.value
        const keyCode = e.which || e.keyCode
        const ENTER = 13

        if (keyCode === ENTER) {
            ajax().get(`https://api.github.com/users/${value}`)
            .then( (result) => {    
                this.setState({
                    userinfo: {
                        login:result.login,
                        userName: result.name,
                        photo: result.avatar_url,
                        repos: result.public_repos,
                        followers : result.followers,
                        following: result.following
                    }
                })
            }).catch( (response, xhr) => {
                this.setState({
                    userinfo: null,
                    repos: [],
                    starred: []
                })
            })
        }
    }
    
    handleRepos (type) {

        const list = []
        ajax().get(`https://api.github.com/users/${this.state.userinfo.login}/${type}`)
        .then( (result) => {
            
            for (let r of result) {
                list.push({
                    name:r.name,
                    link: r.html_url
                })
            }            
        })

        console.log(list)

        return list
    }

    getRepos () {

        
        const repos = this.handleRepos('repos')
        this.setState({
            repos:repos,
            starred: []
        })
    }

    getStarred () {
        const repos = this.handleRepos('starred')
        this.setState({
            starred:repos,
            repos: []
        })
    }

    render() {

        return (

            <AppContent 
                userinfo={this.state.userinfo} 
                repos={this.state.repos}
                starred={this.state.starred}
                handleSearch={(e) => this.handleSearch(e)}
                getRepos={() => this.getRepos()}
                getStarred={() => this.getStarred()}
            />

        )
    }
}


export default App
