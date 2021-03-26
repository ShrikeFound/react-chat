import React from 'react'
import { Redirect, Route } from 'react-router'
import { useUser } from '../context/user.context'

const PrivateRoute = ({ children, ...routeProps }) => {

  const user = useUser();
  if (!user) {
    return <Redirect to="/signin"/>
  }


  return (
    <Route {...routeProps}>
      {children}
    </Route>
  )


}

export default PrivateRoute
