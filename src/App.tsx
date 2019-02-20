import React, { Component, Fragment } from 'react';
import Board from './components/Board';

class App extends Component {
  render() {
    return (
      <Fragment>
        <h1>Tic-Tac-Toe</h1>
        <Board />
      </Fragment>
    );
  }
}

export default App;
