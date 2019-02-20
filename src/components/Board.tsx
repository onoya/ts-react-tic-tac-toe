import React, { Component, Fragment } from 'react';
import Cell from './Box';

class Board extends Component {
  state = {
    board: Array(9).fill(null),
  };

  render() {
    const { board } = this.state;

    return (
      <Fragment>
        {board.map((player, i) => (
          <Cell key={i} />
        ))}
      </Fragment>
    );
  }
}

export default Board;
