import React from 'react'

const Logout = () => {
  localStorage.removeItem('a_a_key')
  window.location.href = '/signin'
  return (
    <div>
      This is logout!
    </div>
  )
}

export default Logout