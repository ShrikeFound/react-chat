import React from 'react'
import TimeAgo from 'timeago-react'

const FiresideItem = ({ room }) => {

  const {createdAt,name,description } = room

  return (
    <div>
      <div>
        <h3>{name}</h3>
        <p>{description}</p>
        <TimeAgo datetime={new Date(createdAt)}/>
      </div>
      <div className="flex-center">
        <span>No Messages</span>
      </div>
    </div>
  )
}

export default FiresideItem
