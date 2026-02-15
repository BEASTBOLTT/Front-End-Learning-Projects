import React from 'react'
import { NavLink } from 'react-router-dom'

const NavBar = () => {
  return (
    <div className='flex flex-row gap-4 place-content-evenly'>
      <NavLink
      to = '/'>
        HOME
      </NavLink>
      <NavLink
      to = '/pastes'>
        PASTES
      </NavLink>
    </div>
  )
}

export default NavBar
