import React, { useState, useEffect } from 'react'
// import Message from '../message'
import Table from 'react-bootstrap/Table'
import Button from '@material-ui/core/Button'

import { connect } from 'react-redux'
import { getMessages, deleteMessage } from '../store/actions/messageAction'

const Orders = props => {
  let [ messages, setMessages ] = useState([])
  // let [seenMessages,setSeenMessages] = useState([]);

  useEffect(() => {
    props.getMessages()
  }, [ props ])
  useEffect(() => {
    setMessages(props.messages)
  }, [ props.messages ])

  const onMessageDelete = async id => {
    let resp = await props.deleteMessage(id)
    if (resp.success) {
      let messagesData = messages.filter(message => message._id !== id)
      setMessages(messagesData)
    }
  }

  return (
    <>
      <Table striped bordered hover>
        <thead>
        <tr className="text-light bg-dark">
          <th>Имя</th>
          <th>Телефон</th>
          <th>Удалить</th>
        </tr>
        </thead>
        <tbody>
        {messages.map((value, index) => {
          return (
            <tr key={index}>
              <td>{value.name}</td>
              <td>{value.phone}</td>
              <td>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => onMessageDelete(value._id)}
                >
                  Удалить
                </Button>
              </td>
            </tr>
          )
        })}
        </tbody>
      </Table>
    </>
  )
}

const mapStateToProps = state => {
  return {
    messages: state.messages,
  }
}

export default connect(mapStateToProps, { getMessages, deleteMessage })(Orders)
