import {useEffect, useRef} from 'react';
import React from 'react';
import { makeStyles } from '@mui/material';

export default function Messages({messages, me}) {
  const bottomRef = useRef(null);
  useEffect(() => {
    if (bottomRef && bottomRef.current) {
      bottomRef.current.scrollIntoView({behavior: 'smooth'});
    }
  });
  return (
    <ul className={makeStyles.messagesList}>
      {messages.map(m => Message(m, me))}
      <div ref={bottomRef}></div>
    </ul>
  );
}
function Message({member, data, id}, me) {
    // 1
    const {username, color} = member.clientData;
    // 2
    const messageFromMe = member.id === me.id;
    const className = messageFromMe ?
      `${makeStyles.messagesMessage} ${makeStyles.currentMember}` : makeStyles.messagesMessage;
    // 3
    return (
      <li key={id} className={className}>
        <span
          className={makeStyles.avatar}
          style={{backgroundColor: color}}
        />
        <div className={makeStyles.messageContent}>
          <div className={makeStyles.username}>
            {username}
          </div>
          <div className={makeStyles.text}>{data}</div>
        </div>
      </li>
    );
  }