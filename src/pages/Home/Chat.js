import React from 'react'
import ChatTop from '../../components/chat-window/top'
import ChatBottom from '../../components/chat-window/bottom'
import Messages from '../../components/chat-window/messages'
import { useParams } from 'react-router'
import { useRoom } from '../../context/room.context'
import { Loader } from 'rsuite'


const Chat = () => {

  const { firesideId } = useParams();

  const rooms = useRoom();

  if (!rooms) {
    return <Loader center vertical size="md" content="Loading" speed="slow" />
  }


  const currentRoom = rooms.find(room => {
    console.log(room.id,firesideId,room.id === firesideId)
    return  room.id === firesideId
  });
  console.log(rooms)
  if (!currentRoom) {
    return <h6 className="mt-c center">Fireside Not Found</h6>
  }

  return (
    <div>
      <div>
        <ChatTop/>
      </div>

      <div>
        <Messages/>
      </div>


      <div>
        <ChatBottom/>
      </div>


    </div>
  )
}

export default Chat
