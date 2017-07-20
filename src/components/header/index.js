import React, { Component } from 'react'

class Header extends Component {
  render() {
    return(
      <header>
        <span>Joshua Ho</span>

        <nav>
          <ul className="horizontal">
            <li>Work</li>
            <li>About / Contact</li>
          </ul>
        </nav>
      </header>
    )
  }
}

export default Header;
