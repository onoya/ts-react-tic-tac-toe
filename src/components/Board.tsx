import React, { FC } from 'react';
import withStyles, { WithStyles } from 'react-jss';
import { GameConsumer } from '../contexts/GameContext';
import Cell from './Cell';

const Board: FC<WithStyles<typeof styles>> = ({ classes }) => (
  <GameConsumer>
    {({ board, handleCellClick }) => (
      <div className={classes.board}>
        {board.map((cell, i) => (
          <Cell key={i} cell={cell} onClick={handleCellClick(i)} />
        ))}
      </div>
    )}
  </GameConsumer>
);

const styles = {
  board: {
    margin: '0 auto',
    display: 'grid',
    gridTemplate: 'repeat(3, 1fr) / repeat(3, 1fr)',
    border: '3px solid black',
    borderRadius: '5px',
    width: '330px',
  },
};

export default withStyles(styles)(Board);
