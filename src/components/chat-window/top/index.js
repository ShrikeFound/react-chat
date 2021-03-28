import React, { memo } from 'react'
import { Link } from 'react-router-dom';
import { Icon } from 'rsuite';
import { useCurrentRoom } from '../../../context/current-room.context'
import { useMediaQuery } from '../../../misc/custom-hooks';

const Top = () => {
  
  const name = useCurrentRoom(v => v.name);
  const isDesktop = useMediaQuery('(min-width: 1000px)');
  return (
    <div className="chat-top pt-2" style={{display:"flex",alignItems:"center",marginLeft:"2rem"}}>
      <Icon componentClass={Link} to="/" icon="arrow-circle-left" size="2x" style={isDesktop ? { display: "none" } : { marginRight: "1rem" }}/>
      <h2>{name}</h2>
    </div>
  )
}

export default memo(Top)
