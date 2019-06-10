import React, { FC, Fragment } from 'react';
import withStyles, { WithStyles } from 'react-jss';
import Board from './components/Board';
import { GameConsumer, Player } from './contexts/GameContext';

const App: FC<WithStyles<typeof styles>> = ({ classes }) => (
  <GameConsumer>
    {({ winner, isDraw, handleReset }) => (
      <Fragment>
        <h1 className={classes.title}>Tic-Tac-Toe</h1>
        <Board />
        {(winner !== null || isDraw) && (
          <div className={classes.winner}>
            <h2>
              {winner !== null
                ? `Player ${winner === Player.One ? 'X' : 'O'} won!`
                : "It's a Draw!"}
            </h2>
          </div>
        )}
        <div className={classes.controls}>
          <button className={classes.button} onClick={handleReset}>
            Reset
          </button>
        </div>
      </Fragment>
    )}
  </GameConsumer>
);

const styles = {
  '@global *': {
    fontFamily: ['Roboto', 'sans-serif']
  },
  '@global body': {
    backgroundColor: '#dedede',
  },
  title: {
    textAlign: 'center',
    textDecoration: 'underline',
  },
  winner: {
    margin: '0 auto',
    width: '70%',
    textAlign: 'center',
  },
  controls: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '1rem',
  },
  button: {
    padding: '.7rem 2rem',
    fontSize: '1rem',
    border: '2px solid #000',
    backgroundColor: '#ccc',
    cursor: 'pointer',
    outline: 'none',
  },
};

export default withStyles(styles)(App);
