import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router';
import { db } from '../../../misc/firebase';
import { convertToArray } from '../../../misc/helpers';
import MessageItem from './MessageItem';

const Messages = () => {
  const [messages, setMessages] = useState(null);
  const { firesideId } = useParams();

  const ChatEmpty = messages && messages.length === 0
  const canShowMessages = messages && messages.length > 0


  useEffect(() => {
    const messagesRef = db.ref('/messages');

    messagesRef.orderByChild('firesideId').equalTo(firesideId).on('value', (snapshot) => {
      const data = convertToArray(snapshot.val());

      setMessages(data);
    })

    return () => {
      messagesRef.off("value");
    }


  },[firesideId])
  console.log(messages)
  return (
    <ul className="chat-middle" style={{listStyle:"none"}}>
      {ChatEmpty && <li>No Messages yet</li>}
      {canShowMessages && messages.map(m => {
        return <MessageItem key={m.id} message={m}/>
      })}
    </ul>
  )
}

export default Messages
