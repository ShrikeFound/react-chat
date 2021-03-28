import React from 'react'
import TimeAgo from 'timeago-react';
import UserAvatar from '../../dashboard/UserAvatar';

const MessageItem = ({message}) => {
  const { author, createdAt, text } = message;
  return (
    <li>
      <div>
        <UserAvatar src={author.avatar} name={author.name} size="xs" />
        <span>{author.name}</span>
        <TimeAgo datetime={createdAt}/>
      </div>

      <div>
        <span>{text}</span>
      </div>

    </li>
  )
}

export default MessageItem
