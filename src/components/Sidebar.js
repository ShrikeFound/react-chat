import React from 'react'
import DashboardToggle from './dashboard/DashboardToggle'
import NewRoomModal from './NewRoomModal'

const Sidebar = () => {
  return (
    <div className="h-100 pt-2">
      <DashboardToggle />
      <NewRoomModal/>
    </div>
  )
}

export default Sidebar
