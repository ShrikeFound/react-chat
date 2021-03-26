
import React from 'react'
import { Button, Drawer } from 'rsuite'
import { useUser } from '../../context/user.context'

const Dashboard = ({onSignOut}) => {

  const { user } = useUser();



  return (
    <>
      <Drawer.Header>
        <Drawer.Title>
        Dashboard
        </Drawer.Title>
      </Drawer.Header>
      <Drawer.Body>
        <h3>{user.name}</h3>
      </Drawer.Body>
      <Drawer.Footer>
        <Button block color="red" onClick={onSignOut}>Sign Out</Button>
      </Drawer.Footer>
    </>
  )
}

export default Dashboard
