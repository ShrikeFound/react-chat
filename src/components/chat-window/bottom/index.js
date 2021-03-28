import React, { useCallback, useState } from 'react'
import { Alert, Icon, Input, InputGroup } from 'rsuite'
import firebase from 'firebase/app'
import { useUser } from '../../../context/user.context'
import { useParams } from 'react-router'
import { db } from '../../../misc/firebase'

const assembleMessage = (user, firesideId) => {
  return {
    firesideId: firesideId,
    author: {
      name: user.name,
      uid: user.uid,
      createdAt: user.createdAt,
      ...(user.avatar ? { avatar: user.avatar }: { })
    },
    createdAt: firebase.database.ServerValue.TIMESTAMP
    
    }
  }


const Bottom = () => {
  const { user } = useUser();
  const { firesideId } = useParams();
  const [input, setInput] = useState('');
  const [loading,setLoading] = useState(false)

  const handleInputChage = useCallback((value) => {
    setInput(value)
  },[])
  
  const handleClickSend = async () => {
    if (input.trim() === '') return;

    const messageData = assembleMessage(user,firesideId)
    messageData.text = input;


    const updates = {};

    const messageId = db.ref('messages').push().key;

    updates[`/messages/${messageId}`] = messageData;
    updates[`/rooms/${firesideId}/lastMessage`] = {
      ...messageData,
      messageId: messageId
    };

    setLoading(true)
    try {
      await db.ref().update(updates)
      setLoading(false)
      setInput('')

    } catch (error) {
      setLoading(false)
      Alert.error(error.message,2500)
    }


  }


  const handleKeyDownSend = (e) => {
    //keycode 13 is the enter button.
    // console.log(e.keyCode)
    // console.log("pressing...");
    if (e.keyCode === 13) {
      // console.log('pressed enter')
      e.preventDefault();
      handleClickSend();
    }
  }


  return (
    <div className="chat-bottom">
      <InputGroup>
        <Input placeholder="write new message here..." value={input} onChange={handleInputChage} onKeyDown={handleKeyDownSend}/>
        <InputGroup.Button disabled={loading} color="green" onClick={handleClickSend}>
          <Icon icon="send"/>
        </InputGroup.Button>
      </InputGroup>
    </div>
  )
}

export default Bottom
