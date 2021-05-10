import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      // eslint-disable-line no-unused-vars
      data: '',
    };
  }

  componentDidMount() {
    // Call our fetch function below once the component mounts
    this.callBackendAPI()
      .then((res) => {
        console.log(res);
        this.setState({ data: JSON.stringify(res) });
        console.log(this.setState);
      })
      .catch((err) => console.log(err));
  }

  /*
    Fetches our GET route from the Express server. (
    Note the route we are fetching matches the GET route from server.js
  */
  callBackendAPI = async () => {
    const response = await fetch('/api/backoffice/customer-services/customers');
    const body = await response.json();

    if (response.status !== 200) {
      throw Error(body.message);
    }
    return body;
  };

  render() {
    const { data } = this.state;
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React!!!!</h1>
        </header>
        {/* Render the newly fetched data inside of this.state.data */}
        <p className="App-intro">The server response: {data}</p>
      </div>
    );
  }
}

export default App;
