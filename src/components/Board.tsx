import React, { Component, Fragment } from 'react';
import Cell from './Box';
import withStyles, { WithStyles } from 'react-jss';

class Board extends Component<WithStyles<typeof styles>> {
  state = {
    board: Array(9).fill(null),
  };

  render() {
    const { board } = this.state;
    const { classes } = this.props;

    return (
      <Fragment>
        <div className={classes.board}>
          {board.map((player, i) => (
            <Cell key={i} />
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
