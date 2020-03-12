import axios from 'axios'

const request = axios.create({
  // baseURL: 'https://vandoors.herokuapp.com/',
  baseURL: 'http://localhost:5000/',
})

export default request