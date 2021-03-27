import React from 'react'
import { Nav } from 'rsuite'
import FiresideItem from './FiresideItem'

const FiresideList = ({sectionHeight}) => {
  return (
    <Nav
      vertical
      className="fireside-nav marker-blue"
      appearance="subtle"
      style={{height: `calc(100% - ${sectionHeight}px)`}}
      
    >
      <Nav.Item>
        <FiresideItem/>
      </Nav.Item>


    </Nav>
  )
}

export default FiresideList
