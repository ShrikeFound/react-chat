import React, { memo } from 'react'
import { Link } from 'react-router-dom';
import { Icon } from 'rsuite';
import { useCurrentRoom } from '../../../context/current-room.context'
import { useMediaQuery } from '../../../misc/custom-hooks';

const Top = () => {
  
  const name = useCurrentRoom(v => v.name);
  const isDesktop = useMediaQuery('(min-width: 1000px)');
  return (
    <div style={{display:"flex",alignItems:"center"}}>
      <Icon componentClass={Link} to="/" icon="arrow-circle-left" size="2x" style={isDesktop ? { display: "none" } : { marginRight: "1rem" }}/>
      <h4>{name}</h4>
    </div>
  )
}

export default memo(Top)
