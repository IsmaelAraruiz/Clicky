import React from 'react'
import { NavLink } from 'react-router-dom'

const NotFound = () => {
  return (
    <div className='notFound-container'>
      <h1 className='notFound-title'>404</h1>
      <p className='notFound-message'>Oops! The page you're looking for doesn't exist.</p>
      <NavLink to="/" className="notFound-link">Go back home</NavLink>
    </div>
  )
}

export default NotFound