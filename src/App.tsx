import React, { Component } from 'react';
import Board from './components/Board';

class App extends Component {
  render() {
    return (
      <div>
        <h1>Tic-Tac-Toe</h1>
        <Board />
      </div>
    );
  }
}

export default App;
