<<<<<<< HEAD
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
        <Route path="/users/:userId?" component={User} />
        <Route path="/users" component={Users} />
      </Switch>
    </>
  )
}

export default App
=======
import React from 'react'
import Users from './components/users'
import User from './components/user'
import NavBar from './components/navBar'
import { Route, Switch } from 'react-router-dom'

const App = () => {
  return (
    <>
      <NavBar />
      <Switch>
        <Route path="/main" render={() => <h2>Main</h2>} />
        <Route path="/login" render={() => <h2>Login</h2>} />
        <Route path="/users/:userId" component={User} />
        <Route path="/users" component={Users} />
      </Switch>
    </>
  )
}

export default App
>>>>>>> 6b867c0017c92aa3671c9a1b1e2f3911baff373f
