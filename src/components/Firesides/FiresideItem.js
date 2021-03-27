import React from 'react'
import TimeAgo from 'timeago-react'

const FiresideItem = () => {
  return (
    <div>
      <div>
        <h3>Fireside Name</h3>
        <TimeAgo datetime={new Date()}/>
      </div>
      <div className="flex-center">
        <span>No Messages</span>
      </div>
    </div>
  )
}

export default FiresideItem
