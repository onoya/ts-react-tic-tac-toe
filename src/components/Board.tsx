import React, { Component, Fragment } from 'react';
import Cell from './Cell';
import withStyles, { WithStyles } from 'react-jss';

const WINNING_LINES = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

export enum Player {
  One,
  Two,
}

type GameBoard = Array<Player | null>;

interface State {
  board: GameBoard;
  player: Player;
  winner: Player | null;
}

class Board extends Component<WithStyles<typeof styles>, State> {
  public state: State = {
    board: Array(9).fill(null),
    player: Player.One,
    winner: null,
  };

  public render() {
    const { board, winner } = this.state;
    const { classes } = this.props;

    return (
      <Fragment>
        <div className={classes.board}>
          {board.map((cell, i) => (
            <Cell key={i} cell={cell} onClick={this.handleCellClick(i)} />
          ))}
        </div>
        {winner !== null && (
          <div className={classes.winner}>
            <h2>
              {winner !== null ? `Player ${winner} won!` : "It's a Draw!"}
            </h2>
          </div>
        )}
      </Fragment>
    );
  }

  private handleCellClick = (index: number) => () => {
    const { board, player, winner } = this.state;
    const newBoard = [...board];

    // Prevent it from updating the cell when it is not null,
    // or when there is already a winner
    if (board[index] !== null || winner !== null) {
      return;
    }

    newBoard[index] = player;

    this.setState(prevState => ({
      board: newBoard,
      player: prevState.player === Player.One ? Player.Two : Player.One,
      winner: this.getWinner(newBoard),
    }));
  };

  private getWinner = (board: GameBoard) => {
    for (let index = 0; index < WINNING_LINES.length; index++) {
      const [a, b, c] = WINNING_LINES[index];
      if (board[a] !== null && board[a] === board[b] && board[a] === board[c]) {
        return this.state.player;
      }
    }
    return null;
  };
}

const styles = {
  board: {
    margin: '0 auto',
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    width: '330px',
  },
  winner: {
    margin: '0 auto',
    width: '70%',
    textAlign: 'center',
  },
};

export default withStyles(styles)(Board);
