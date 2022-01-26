import React from 'react'
import UsersListPage from './components/page/usersListPage'
import UserPage from './components/page/userPage'
import NavBar from './components/ui/navBar'
import Login from './components/layot/login'
import { Route, Switch } from 'react-router-dom'
import EditForm from './components/ui/editForm'

const App = () => {
  return (
    <>
      <NavBar />
      <Switch>
        <Route path="/main" render={() => <h2>Main</h2>} />
        <Route path="/login/:type?" component={Login} />
        <Route path="/users/:userId?/edit" component={EditForm} />
        <Route path="/users/:userId" component={UserPage} />
        <Route path="/users" component={UsersListPage} />
      </Switch>
    </>
  )
}

export default App
