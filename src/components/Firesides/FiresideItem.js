import React from 'react'
import TimeAgo from 'timeago-react'
import UserAvatar from '../dashboard/UserAvatar'

const FiresideItem = ({ room }) => {

  const {createdAt,name,description,lastMessage } = room

  return (
    <div >
      
      <div style={{ display: "flex", justifyContent:"space-between",alignItems:"center"}}>
        <h3>{name}</h3>
        <TimeAgo datetime={lastMessage ? lastMessage.createdAt : new Date(createdAt)}/>
      </div>
      
      <div style={{ color: "grey" }}>
        <p>{description}</p>
        <div className="flex" style={{ alignItems: "center", marginTop: "1rem"}}>
        {
          lastMessage ? <>
            <div style={{marginRight: ".5rem"}}>
              <UserAvatar src={lastMessage.author.avatar} name={lastMessage.author.name} size="sm"/>
            </div>
            <div>
              <h6>{lastMessage.author.name}</h6>
              <p>{lastMessage.text}</p>
            </div>
          </> : <span>No Messages</span>
          }
          </div>
        

      </div>

    </div>
  )
}

export default FiresideItem
