import React, { Component, Fragment } from 'react';
import withStyles, { WithStyles } from 'react-jss';
import GameContext, { Player } from '../contexts/GameContext';
import Cell from './Cell';

class Board extends Component<WithStyles<typeof styles>> {
  public static contextType = GameContext;

  public render() {
    const { board } = this.context;
    const { classes } = this.props;

    return (
      <Fragment>
        <div className={classes.board}>
          {board.map((cell: Player, i: number) => (
            <Cell
              key={i}
              cell={cell}
              onClick={this.context.handleCellClick(i)}
            />
          ))}
        </div>
      </Fragment>
    );
  }
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
