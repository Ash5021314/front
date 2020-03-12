import { GET_ALL, DELETE_DOOR } from '../actions/types'

const initialState = []

export default function (state = initialState, action) {
  switch (action.type) {
    // case GET_INTERIOR:
    //   return {
    //     ...state,
    //     interior: action.payload.data,
    //   }
    // case GET_IRON:
    //   return {
    //     ...state,
    //     iron: action.payload.data,
    //   }
    case GET_ALL:
      return action.payload.data
    case  DELETE_DOOR:
      return state.filter((door) => door._id !== action.payload.id)
    default:
      return state
  }
}
