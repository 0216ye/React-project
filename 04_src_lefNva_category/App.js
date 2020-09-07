import React, {Component} from 'react'
import {Route,Switch,Redirect} from 'react-router-dom'
import Admin from './containers/Admin/Admin'
import Login from './containers/Login/Login'
import './App.less'

export default class App extends Component {
  render() {
    return (
      <div className = 'app'> 
        <Switch>
          <Route path = "/login" component={Login} />
          <Route path = "/admin" component={Admin} />
          <Redirect to = '/admin' />
        </Switch>
      </div>
    )
  }
} 
