import React from 'react'
import TimeAgo from 'timeago-react'

const FiresideItem = ({ room }) => {

  const {createdAt,name } = room

  return (
    <div>
      <div>
        <h3>{name}</h3>
        <TimeAgo datetime={new Date(createdAt)}/>
      </div>
      <div className="flex-center">
        <span>No Messages</span>
      </div>
    </div>
  )
}

export default FiresideItem
