import React from 'react'
import { Avatar } from 'rsuite'

const UserAvatar = ({ name,...avatarProps }) => {
  return (
    <Avatar {...avatarProps}>
      {}
    </Avatar>
  )
}

export default UserAvatar
