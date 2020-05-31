import React from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  const request = new Request('https://api.spotify.com/v1/albums/4aawyAB9vmqN3uQ7FjRGTy/tracks?market=ES&limit=10&offset=5', {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: 'Bearer BQBGD_HWjJUBoRtcPXl0u-vAN35z-TfCuSCMTyfdhKOIIIzenK1TLXKUnay8gFxqpAOBxxeAX-X1Jrx-lfx1jtcsFHnf06ZFf3o_M3DIj0J7YQ6Aga8-UURJK_fqLTy-9xoy77AIpWKsUYKd9wZAHtbwnSiIdJPe0Gg',
    },
  });
  console.log(request);

  fetch(request)
    .then((response) => response.json())
    .then((json) => console.log(json));

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit
          {' '}
          <code>src/App.js</code>
          {' '}
          and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
