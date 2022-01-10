import React from 'react'
import Users from './components/users'
import User from './components/user'
import NavBar from './components/navBar'
import Login from './components/layot/login'
import { Route, Switch } from 'react-router-dom'

const App = () => {
  return (
    <>
      <NavBar />
      <Switch>
        <Route path="/main" render={() => <h2>Main</h2>} />
        <Route path="/login" component={Login} />
        <Route path="/users/:userId" component={User} />
        <Route path="/users" component={Users} />
      </Switch>
    </>
  )
}

export default App
