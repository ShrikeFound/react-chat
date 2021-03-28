import React, { useCallback } from 'react'
import { Alert, Button, Drawer, Icon } from 'rsuite'
import { useMediaQuery, useModalState } from '../../misc/custom-hooks'
import Dashboard from '.';
import { auth } from '../../misc/firebase';

const DashboardToggle = () => {
  
  const { isOpen, close, open } = useModalState();
  const isDesktop = useMediaQuery('(min-width: 1000px)');

  const onSignOut = useCallback(() => {
    
    auth.signOut();
    Alert.info("Signed out", 2500);

    close();

  },[close])

  return (
    <>
      <Button block color="orange" onClick={open}>
        <Icon icon="dashboard"/> Dashboard
      </Button>

      <Drawer full={!isDesktop} show={isOpen} onHide={close} placement="left">
        <Dashboard onSignOut={ onSignOut }/>
      </Drawer>

    </>
  )
}

export default DashboardToggle
