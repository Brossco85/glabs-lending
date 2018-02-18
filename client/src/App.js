import React, { Component } from 'react';
import { Image, Nav, Jumbotron, Button } from 'react-bootstrap';
import logo from './glabs.png';
import background from './canary-wharf.jpg';
import './App.css';

var sectionStyle = {
  width: "100%",
  height: "600px",
  backgroundImage: `url(${background})`
};

class App extends Component {

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <Image src={logo} className="navbar-brand" alt="logo" />
        <Nav className="Nav-header"></Nav>
        </header>
        <Jumbotron style={sectionStyle}>
          <p className="page-title-top">
          The #1 Enterprise Financial Services Platform.
          </p>
          <p className="page-sub-title">
          Discover what is possible with the Intelligent Financial Services Platform from Financial Cloud. 
          </p>
          <p>
            <Button className="btn-content-button-1">Learn more</Button>
          </p>
        </Jumbotron>
      </div>
    );
  }
}

export default App;
