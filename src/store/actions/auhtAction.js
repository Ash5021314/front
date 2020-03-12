import { ADMIN_LOGIN, ADMIN_LOGOUT } from './types'
import request from '../../request'

export const login = doc => {
  return dispatch => {
    request({
      method: 'POST',
      url: `/admin/login`,
      headers: {
        'Content-Type': 'application/json',
      },
      data: doc,
    })
      .then(data => {
        dispatch(setAuthToken(data.data.token))
        window.location.href = '/administrator'
      })
      .catch(e => console.log('Not Allowed'))
  }
}

const setAuthToken = token => {
  return dispatch => {
    if (token && token !== '') {
      localStorage.setItem('a_a_key', token)
      dispatch({ type: ADMIN_LOGIN, payload: token })
    } else {
      console.log('Unauthorized')
    }
  }
}

export const Init = () => {
  return async dispatch => {
    try {
      const token = localStorage.getItem('a_a_key')
      let verifyToken = await checkToken(token)
      if (!verifyToken) {
        dispatch(logout())
      }
    } catch (e) {
      // console.log(e)
      dispatch(logout())
    }
  }
}

const checkToken = async token => {
  try {
    let response = await request({
      method: 'GET',
      url: `/admin/jwt_check`,
      headers: {
        'Content-Type': 'application/json',
        authorization: `${token}`,
      },
    })
    const { data } = response
    if (data.success) {
      return true
    } else {
      return false
    }
  } catch (e) {
    return false
  }
}

export const logout = () => {
  return dispatch => {
    localStorage.removeItem('a_a_key')
    dispatch({ type: ADMIN_LOGOUT })
  }
}
