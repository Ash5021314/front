import {
  MESSAGE_SEND,
  GET_MESSAGES,
  GET_SEEN_MESSAGES,
  DELETE_MESSAGE,
  MARK_AS_SEEN,
} from './types'

import request from '../../request'

export const sendMessage = doc => {
  return async dispatch => {
    await request({
      method: 'POST',
      url: `/messages`,
      headers: {
        'Content-Type': 'application/json',
      },
      data: doc,
    })
    dispatch({ type: MESSAGE_SEND })
  }
}

export const getMessages = () => {
  return async dispatch => {
    let data = await request({
      method: 'GET',
      url: `/messages`,
      headers: {
        'Content-Type': 'application/json',
      },
    })
    dispatch({ type: GET_MESSAGES, payload: data.data })
  }
}

export const getSeenMessages = () => {
  return async dispatch => {
    let data = await request({
      method: 'GET',
      url: `/messages?seen=false`,
      headers: {
        'Content-Type': 'application/json',
      },
    })
    dispatch({ type: GET_SEEN_MESSAGES, payload: data.data })
  }
}

export const deleteMessage = id => {
  return async dispatch => {
    let data = await request({
      method: 'DELETE',
      url: `/messages/${id}`,
      headers: {
        'Content-Type': 'application/json',
      },
    })
    dispatch({ type: DELETE_MESSAGE })
    if (data.data.success) {
      return { success: true }
    }
  }
}

export const markAsSeen = id => {
  return async dispatch => {
    let data = await request({
      method: 'PATCH',
      url: `/messages/${id}`,
      headers: {
        'Content-Type': 'application/json',
      },
    })
    dispatch({ type: MARK_AS_SEEN, payload: data.data })
  }
}
