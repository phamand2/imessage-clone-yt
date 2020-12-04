import React, {useEffect, useState} from 'react'
import './Chat.css'
import MicNoneIcon from '@material-ui/icons/MicNone'
import { IconButton } from '@material-ui/core'
import { Message } from './Message'
import { selectChatId, selectChatName } from '../features/chatSlice'
import {selectUser} from '../features/userSlice'
import { useSelector } from 'react-redux'
import db from '../firebase'
import firebase from 'firebase'
import FlipMove from 'react-flip-move'

export const Chat = () => {
  const user = useSelector(selectUser)
  const [input, setInput] = useState('');
  const chatName = useSelector(selectChatName);
  const chatId = useSelector(selectChatId);
  const [messages, setMessages] = useState([]);
  

  useEffect(() => {
    if (chatId) {
      db.collection("chats")
        .doc(chatId)
        .collection("messages")
        .orderBy("timestamp", "desc")
        .onSnapshot((snapshot) =>
          setMessages(
            snapshot.docs.map((doc) => ({
              id: doc.id,
              data: doc.data(),
            }))
          )
        );
    }
  }, [chatId]);

  const sendMessage = (e) => {
    e.preventDefault()
    setInput('')

    //Firebase
    db.collection('chats').doc(chatId).collection('messages').add({
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      message: input,
      uid: user.uid,
      photo: user.photo,
      email: user.email,
      displayName: user.displayName
    });
  }

  const inputHandler = (e) => {
    setInput(e.target.value)
  }



  return (
    <div className="chat">
      <div className="chat__header">
        <h4>To: <span className='chat__name'>{chatName}</span> </h4>
        <strong>Details</strong>
      </div>
      <div className="chat__messages">
        <FlipMove>
          {messages.map(({id, data }) => (
            <Message key={id} contents={data} />
          ))}
        </FlipMove>
      </div>

    
      <div className="chat__input">
        <form>
          <input value={input} onChange={inputHandler} placeholder='iMessage' type="text"/>
          <button onClick={sendMessage}>Send Message</button>
        </form>
        <IconButton variant='outlined'>
            <MicNoneIcon className='chat__mic' />
        </IconButton>        
      </div>
    </div>
  )
}
