import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Loader, Nav } from 'rsuite'
import { useRoom } from '../../context/room.context'
import FiresideItem from './FiresideItem'

const FiresideList = ({ sectionHeight }) => {
  
  const rooms = useRoom();
  const location = useLocation();

  console.log(rooms)
  return (
    <Nav
      vertical
      className="fireside-nav marker-blue"
      appearance="subtle"
      reversed
      activeKey={location.pathname}
      style={{height: `calc(100% - ${sectionHeight}px)`}}
      
    >
      {!rooms && <Loader center vertical content="Loading" speed="slow" size="md" />}
      
      {
        rooms && rooms.length > 0 && rooms.map(r => (
      <Nav.Item componentClass={Link} to={`/fireside/${r.id}`} key={r.id} eventKey={`/fireside/${r.id}`}>
            <FiresideItem room={r}/>
      </Nav.Item>
        ))
      }


    </Nav>
  )
}

export default FiresideList
