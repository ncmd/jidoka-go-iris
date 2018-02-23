import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React <span role="img" aria-label="cool">😎</span></h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
            <h2>Sitemap</h2>
            <a href="http://localhost:3000/user/register">Register New User: /user/register</a><br/>
            <a href="http://localhost:3000/user/login">Login: /user/login</a><br/>
            <a href="http://localhost:3000/user/logout">Logout: /user/logout</a><br/>
            <a href="http://localhost:3000/user/me">Current User: /user/me</a><br/>
            <h3>Requires Authentication</h3>
            <h4>(user=admin | password=password)</h4>
            <br/>
            <a href="http://localhost:3000/users">Search User Database: /users</a><br/>
            <a href="http://localhost:3000/users/1">Search by User ID: /users/id</a><br/>
        </p>
      </div>
    );
  }
}

export default App;
