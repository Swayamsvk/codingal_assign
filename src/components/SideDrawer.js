import React from 'react'

import './SideDrawer.css'

const sideDrawer = props => {
  return (
    <nav className="side-drawer">
      <ul>
        <li>
          <a href="/">Class Completed</a>
        </li>
        <li>
          <a href="/">Class Interrupted/aborted</a>
        </li>
      </ul>
    </nav>
  )
}

export default sideDrawer