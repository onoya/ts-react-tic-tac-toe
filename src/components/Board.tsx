import React, { FC, useContext } from 'react';
import withStyles, { WithStyles } from 'react-jss';
import GameContext from '../contexts/GameContext';
import Cell from './Cell';

const Board: FC<WithStyles<typeof styles>> = ({ classes }) => {
  const { board, handleCellClick } = useContext(GameContext);
  return (
    <div className={classes.board}>
      {board.map((cell, i) => (
        <Cell key={i} cell={cell} onClick={handleCellClick(i)} />
      ))}
    </div>
  );
};

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
