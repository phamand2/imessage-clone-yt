import React, { forwardRef }  from 'react'
import './Message.css'
import { Avatar } from '@material-ui/core'
import { useSelector } from 'react-redux'
import { selectUser } from '../features/userSlice'

export const Message = forwardRef(({id, contents: {
  timestamp, displayName, email, message, photo, uid
}}, ref) =>{

  const user = useSelector(selectUser) 


  return (
    <div ref={ref} className={`message ${user.email === email && 'message__sender'}`}>
      <Avatar src={photo} />
      <p>{message}</p>
      <small>{new Date(timestamp?.toDate()).toLocaleString()}</small>
    </div>
  )
})
