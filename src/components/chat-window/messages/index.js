import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router';
import { Button } from 'rsuite';
import { db } from '../../../misc/firebase';
import { convertToArray, groupBy } from '../../../misc/helpers';
import MessageItem from './MessageItem';

const MessageCount = 15;
const messagesRef = db.ref('/messages');

const Messages = () => {
  const [messages, setMessages] = useState(null);
  const { firesideId } = useParams();
  const [limit,setLimit] = useState(MessageCount)
  const selfRef = useRef();
  const ChatEmpty = messages && messages.length === 0
  const canShowMessages = messages && messages.length > 0


  const loadMessages = useCallback((limitToLast) => {
    
    messagesRef.off();


    messagesRef.orderByChild('firesideId').equalTo(firesideId).limitToLast(limitToLast || MessageCount).on('value', (snapshot) => {
      const data = convertToArray(snapshot.val());

      setMessages(data);
    })

    setLimit(previous => previous+MessageCount)
  },[firesideId])


  const onLoadMore = useCallback(() => {
    const node = selfRef.current
    const oldHeight = node.scrollHeight
    loadMessages(limit)


    setTimeout(() => {
      const newHeight = node.scrollHeight;
      node.scrollTop = newHeight - oldHeight;
    },100)

  },[loadMessages,limit])


  useEffect(() => {
    const node = selfRef.current

    loadMessages();

    setTimeout(() => {

          node.scrollTop = node.scrollHeight;
    },200)



    return () => {
      messagesRef.off("value");
    }


  },[loadMessages])
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

  console.log(messages? `messages : ${messages.length}` : "no messages yet")
  console.log("limit: ",limit)
  return (
    <ul ref={selfRef} className="chat-middle" style={{ listStyle: "none", overflowY: "scroll", paddingRight: "1rem" }}>
      {messages && messages.length >= MessageCount && (
        <li className="mt-2 center mb-1"><Button onClick={onLoadMore} color="green">Load More</Button></li>
      ) }
      {ChatEmpty && <li>No Messages yet</li>}
      {canShowMessages && renderMessages()}
    </ul>
  )
}

export default Messages


