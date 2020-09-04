import React, {Component} from 'react'
import {Route,Switch} from 'react-router-dom'
import Admin from './containers/Admin/Admin'
import Login from './containers/Login/Login'
import './App.less'

export default class App extends Component {
  render() {
    return (
      <div>
        <Switch>
          <Route path = "/login" component={Login} />
          <Route path = "/admin" component={Admin} />
        </Switch>
      </div>
    )
  }
} 
