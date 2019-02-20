import React, { Fragment, FC } from 'react';
import withStyles, { WithStyles } from 'react-jss';
import Board from './components/Board';

const App: FC<WithStyles<typeof styles>> = ({ classes }) => (
  <Fragment>
    <h1 className={classes.title}>Tic-Tac-Toe</h1>
    <Board />
  </Fragment>
);

const styles = {
  '@global body': {
    backgroundColor: '#dedede',
  },
  title: {
    textAlign: 'center',
    textDecoration: 'underline',
  },
};

export default withStyles(styles)(App);
