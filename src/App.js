import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from "react-router-dom";
import Backdrop from './components/Backdrop';
import SideDrawer from './components/SideDrawer';
import Navbar from './components/Navbar';
import Posts from './components/Posts/Posts';

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      sideDrawerOpen: false,
    }
  }

  drawerToggleClickHandler = () => {
    this.setState(prevState => {
      return { sideDrawerOpen: !prevState.sideDrawerOpen }
    })
  }

  backdropClickHandler = () => {
    this.setState({ sideDrawerOpen: false })
  }

  render() {
    let backdrop
    let sideDrawer

    if (this.state.sideDrawerOpen) {
      backdrop = <Backdrop click={this.backdropClickHandler} />
      sideDrawer = <SideDrawer />
    }
    return (
      <Router>
        <div style={{ height: '100%' }}>
          <Navbar drawerClickHandler={this.drawerToggleClickHandler} />
          {sideDrawer}
          {backdrop}
          <main style={{ marginTop: '64px' }}>
          <Route path="/posts" exact component={Posts}/>
          </main>
        </div>
      </Router>
    )
  }
}

export default App;
