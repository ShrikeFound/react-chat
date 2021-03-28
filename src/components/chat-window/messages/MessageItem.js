import React from 'react'
import TimeAgo from 'timeago-react';
import UserAvatar from '../../dashboard/UserAvatar';

const MessageItem = ({message}) => {
  const { author, createdAt, text } = message;
  return (
    <li style={{marginTop: "1rem"}}>
      <div style={{ display: "flex", alignItems: "center", justifyContent:"space-between"}}>
        <div style={{display:"flex",alignItems:"center"}}>
          <UserAvatar src={author.avatar} name={author.name} size="xs" />
          <span style={{marginLeft: ".3rem",fontWeight:"bold"}}>{author.name}</span>
        </div>
        <TimeAgo datetime={createdAt}/>
      </div>

      <div style={{ marginLeft: "1.4rem",marginTop:".5rem"}}>
        <span>{text}</span>
      </div>

    </li>
  )
}

export default MessageItem
