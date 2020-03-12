import {
  MESSAGE_SEND,
  GET_MESSAGES,
  GET_SEEN_MESSAGES,
  MARK_AS_SEEN,
} from '../actions/types'

const initialState = []

export default function (state = initialState, action) {
  switch (action.type) {
    case MESSAGE_SEND:
      return {
        ...state,
      }
    case GET_MESSAGES:
      return action.payload.data
    case GET_SEEN_MESSAGES:
      return {
        ...state,
        seenMessages: action.payload.data,
      }
    case MARK_AS_SEEN:
      const message = state.find(({ _id }) => _id === action.payload.data._id)
      if (!message) {
        return state
      }
      message.seen = true

      return state
    // case DELETE_MESSAGE:
    //   return{

    //   }
    default:
      return state
  }
}
