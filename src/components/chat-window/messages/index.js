import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router';
import { db } from '../../../misc/firebase';

const Messages = () => {
  const [messages, setMessages] = useState(null);
  const { firesideId } = useParams();

  useEffect(() => {
    const messagesRef = db.ref('/messages');

    messagesRef.orderByChild('roomId').equalTo(firesideId)

  },[])

  return (
    <div>
      messages
    </div>
  )
}

export default Messages
