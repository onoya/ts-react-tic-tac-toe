import React, { FC } from 'react';
import withStyles, { WithStyles } from 'react-jss';
import { Player } from './Board';

interface Props extends WithStyles<typeof styles> {
  cell: Player | null;
  onClick: () => any;
}

const Cell: FC<Props> = ({ classes, cell, onClick }) => (
  <div className={classes.cell} onClick={onClick}>
    {cell !== null && (cell === Player.One ? 'X' : 'O')}
  </div>
);

const styles = {
  cell: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    border: '5px solid black',
    width: '100px',
    height: '100px',
    cursor: 'pointer',
  },
};

export default withStyles(styles)(Cell);
