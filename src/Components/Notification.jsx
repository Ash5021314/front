import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import Checkbox from '@material-ui/core/Checkbox'
import { connect } from 'react-redux'
import { markAsSeen, getSeenMessages, getMessages } from '../store/actions/messageAction'

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: '#00A9F7',
    position: 'absolute',
    top: '43px',
    right: '45px',
  },
}))

const Notification = (props) => {
  const classes = useStyles()
  const [ messages, setMessages ] = useState([])

  useEffect(() => {
    props.getMessages()
    // eslint-disable-next-line
  }, [])

  useEffect(() => {
    setMessages(props.messages)
  }, [ props.messages ])

  const handleToggle = (id, event) => {
    // console.log(id, [event.target])
    // setChecked(value);
    if (event.target.checked) {
      props.markAsSeen(id)
    }

    event.target.checked = false

    props.getMessages()
  }

  return (
    <>
      {!!messages.length && (
        <List className={classes.root}>
          {messages.filter(({ seen }) => !seen).map((value, index) => {
            return (
              <ListItem className="panel" key={index} dense button>
                <ListItemIcon>
                  <Checkbox onClick={(event) => handleToggle(value._id, event)}/>
                </ListItemIcon>
                <ListItemText primary={` ${value.name} - ${value.phone}`}/>
              </ListItem>
            )
          })}
        </List>
      )}
    </>
  )
}

const mapStateToProps = state => {
  return {
    messages: state.messages,
  }
}

export default connect(mapStateToProps, { getSeenMessages, getMessages, markAsSeen })(
  Notification,
)
