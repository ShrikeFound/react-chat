import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router';
import { db } from '../../../misc/firebase';
import { convertToArray, groupBy } from '../../../misc/helpers';
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


  const renderMessages = () => {

    const groups = groupBy(messages, (item) => {
      // console.log("item: ",item)
      //make it a date object so we can group by it
      return new Date(item.createdAt).toDateString();
    })

    const items = [];

    Object.keys(groups).forEach((date) => {
      console.log("date: ",date)
      items.push(<li key={date} className="center" style={{color:"grey"}}> {date}</li>)

      const messagesByDate = groups[date].map(msg => {
        return <MessageItem key={msg.id} message={msg}/>
      })
      
      //instead of something like items = items.concat(messagesByDate), we can push the spread array
      items.push(...messagesByDate)


    })
      console.log("items: ",items)
      return items

  }


  return (
    <ul className="chat-middle" style={{listStyle:"none"}}>
      {ChatEmpty && <li>No Messages yet</li>}
      {canShowMessages && renderMessages()}
    </ul>
  )
}

export default Messages


