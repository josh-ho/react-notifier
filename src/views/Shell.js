import React, { Component } from 'react'
import Header from '../components/header/index.js'
import Footer from '../components/footer/index.js'

import './scss/index.scss'

class Shell extends Component {
  render() {
    return(
      <div>
        <Header />
        <main role="main">
          {this.props.children}
        </main>
        <Footer />
      </div>
    )
  }
}

export default Shell;
