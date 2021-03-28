import React from 'react'
import { Route, Switch, useRouteMatch } from 'react-router'
import { Grid, Row, Col } from 'rsuite'
import Sidebar from '../../components/Sidebar'
import { RoomProvider } from '../../context/room.context'
import { useMediaQuery } from '../../misc/custom-hooks'
import Chat from './Chat'

const Home = () => {

  const isDesktop = useMediaQuery('(min-width: 1000px)');
  const { isExact } = useRouteMatch();

  const renderSidebar = isDesktop || isExact;


  return (
    <RoomProvider>
      <Grid fluid className="h-100">
        <Row className="h-100">
          {renderSidebar &&
            <Col xs={24} md={7} className="h-100">
              <Sidebar />
            </Col>
          }
          <Switch>
            <Route exact path="/firesides/:firesideId">
              <Col xs={24} md={17} className="h-100">
                <Chat/>
              </Col>
            </Route>
          </Switch>


      </Row>
      </Grid>
     </RoomProvider>
  )
}

export default Home
