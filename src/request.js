import axios from 'axios'

const request = axios.create({
  baseURL: 'https://vandoors.herokuapp.com/',
})

export default request