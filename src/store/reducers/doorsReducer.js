import { GET_ALL, DELETE_DOOR } from '../actions/types'

const initialState = []

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_ALL:
      const a = action.payload.data
      a.reverse()
      return a
    case  DELETE_DOOR:
      return state.filter((door) => door._id !== action.payload.id)
    default:
      return state
  }
}
