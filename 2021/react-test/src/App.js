import logo from './logo.svg';
import { useState, useEffect } from 'react';
import './App.css';

function App() {

    const [myString, setMyString] = useState('ho');

    useEffect(() => {
        setTimeout(() => {
            setMyString('hohoho');
        },1);
    })
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
            {myString}
        </p>
        <p>
          Edit <code>src/App.js</code> and save to reload.
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
