import { GET_INTERIOR, GET_IRON, GET_ALL, UPDATE_DOOR, DELETE_DOOR } from './types'
import request from '../../request'

export const createDoor = data => {
  return async () => {
    let response = await sendDoorData(data)
    if (response.success) {
      return { success: true }
    }
  }
}

export const updateDoor = (doorId, data) => {
  return async () => {
    let response = await sendDoorDataToUpdate(doorId, data)
    if (response.success) {
      return { success: true }
    }
  }
}

const smallImageSame = async (doorId, data) => {
  try {
    const response = await request.post(`/doors/${doorId}/other-color`, data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      },
    )

    return response.data.data
  } catch (e) {
    return
  }
}
const moreImageSame = async (doorId, data) => {
  try {
    const response = await request.post(`/doors/${doorId}/more-image`, data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      },
    )

    return response.data.data
  } catch (e) {
    return
  }
}

export const createDoorOtherColor = (doorId, data) => {
  return async dispatch => {
    const formData = new FormData()
    for (const key in data) {
      if ('image' === key) {
        formData.append('img', data[key])
      } else {
        formData.append(key, data[key])
      }
    }

    let response = await smallImageSame(doorId, formData)
    if (response.success) {
      dispatch({ type: UPDATE_DOOR, payload: response.data })
    }
  }

}
export const createDoorMore = (doorId, data) => {
  return async dispatch => {
    const formData = new FormData()
    for (const key in data) {
      if ('image' === key) {
        formData.append('img', data[key])
      } else {
        formData.append(key, data[key])
      }
    }

    let response = await moreImageSame(doorId, formData)
    if (response.success) {
      dispatch({ type: UPDATE_DOOR, payload: response.data })
    }
  }
}

export const deleteItem = (id) => {
  return async dispatch => {
    let data = await request.delete(`/doors/${id}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (data.data.success) {
      dispatch({ type: DELETE_DOOR, payload: { id } })
    }
  }
}

const sendDoorData = async data => {
  let response = await request.post(`/doors/`, data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
  return response.data
}
const sendDoorDataToUpdate = async (doorId, data) => {
  let response = await request.put(`/doors/${doorId}`, data, {
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    },
  })
  return response.data
}

export const getDoors = () => {
  return async dispatch => {
    let response = await request.get(`/doors`, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    if (response.data.success) {
      dispatch({ type: GET_ALL, payload: response.data})
    }
  }
}