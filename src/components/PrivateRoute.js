import React from 'react'
import { Redirect, Route } from 'react-router'
import { Container, Loader } from 'rsuite';
import { useUser } from '../context/user.context'

const PrivateRoute = ({ children, ...routeProps }) => {

  const { user,loading } = useUser();


  if (loading && !user) {
    return <Container>
      <Loader center vertical size="md" content="Loading" speed="slow"/>
    </Container>
  }

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
