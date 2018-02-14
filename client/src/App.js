import React, { Component } from 'react';
import { Image, Nav } from 'react-bootstrap';
import logo from './glabs.png';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <Image src={logo} className="navbar-brand" alt="logo" />
        </header>
        <Nav className="Nav-header" ></Nav>
      </div>
    );
  }
}

export default App;
