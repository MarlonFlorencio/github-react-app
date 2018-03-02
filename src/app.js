'use strict'

import React, { Component } from 'react'
import AppContent from './components/app-content'

class App extends Component {

    constructor() {
        super();
        this.state = {
            userinfo: {
                login:'MarlonFlorencio',
                userName: 'Marlon Florencio',
                photo: 'https://avatars1.githubusercontent.com/u/14018604?v=4',
                repos: 12,
                followers : 10,
                following:11
            },
            repos: [{name: 'Repo', link : '#'}],
            starred: [{name: 'Repo', link : '#'}]
        }
    }

    render() {

        return (

            <AppContent 
                userinfo={this.state.userinfo} 
                repos={this.state.repos}
                starred={this.state.starred}
            />

        )
    }
}

export default App
