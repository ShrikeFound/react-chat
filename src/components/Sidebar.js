import React, { useEffect, useRef, useState } from 'react'
import { Divider } from 'rsuite'
import DashboardToggle from './dashboard/DashboardToggle'
import FiresideList from './Firesides/FiresideList'
import NewRoomModal from './NewRoomModal'

const Sidebar = () => {

  const topSectionRef = useRef();
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (topSectionRef.current) {
      setHeight(topSectionRef.current.scrollHeight)
    }
  })

  return (
    <div className=" overflow-y-hidden h-100 pt-2">
      <div className="marker-red" ref={topSectionRef} height="230px">
      <DashboardToggle />
      <NewRoomModal />
        <Divider>Firesides</Divider>
      </div>
      <FiresideList className="marker-blue" sectionHeight={ height}/>
    </div>
  )
}

export default Sidebar
