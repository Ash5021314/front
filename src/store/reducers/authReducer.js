import { ADMIN_LOGIN, ADMIN_LOGOUT } from '../actions/types'

const initialState = {
  token: null,
  isAuthenticated: false,
}

export default function (state = initialState, action) {
  switch (action.type) {
    case ADMIN_LOGIN:
      return {
        ...state,
        token: action.payload,
        isAuthenticated: true,
      }
    case ADMIN_LOGOUT:
      return {
        ...state,
        token: null,
        isAuthenticated: false,
      }
    default:
      return state
  }
}
