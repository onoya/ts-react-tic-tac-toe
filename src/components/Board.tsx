import React, { Component, Fragment } from 'react';
import Cell from './Cell';
import withStyles, { WithStyles } from 'react-jss';

export enum Player {
  One,
  Two,
}

type GameBoard = Array<Player | null>;

interface State {
  board: GameBoard;
  player: Player;
}

class Board extends Component<WithStyles<typeof styles>, State> {
  public state: State = {
    board: Array(9).fill(null),
    player: Player.One,
  };

  public render() {
    const { board } = this.state;
    const { classes } = this.props;

    return (
      <Fragment>
        <div className={classes.board}>
          {board.map((cell, i) => (
            <Cell key={i} cell={cell} onClick={this.handleCellClick(i)} />
          ))}
        </div>
      </Fragment>
    );
  }

  private handleCellClick = (index: number) => () => {
    const { board, player } = this.state;
    const newBoard = [...board];

    // Prevent it from updating the cell when it is not null
    if (board[index] !== null) {
      return;
    }

    newBoard[index] = player;

    this.setState(prevState => ({
      board: newBoard,
      player: prevState.player === Player.One ? Player.Two : Player.One,
    }));
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
};

export default withStyles(styles)(Board);
