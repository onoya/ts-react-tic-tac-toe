import React, { Component, createContext } from 'react';

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

interface IGameContext {
  board: GameBoard;
  player: Player;
  winner: Player | null;
  isDraw: boolean;
  handleCellClick: (index: number) => void;
  handleReset: () => void;
  getWinner: (board: GameBoard) => Player | null;
}

interface State {
  board: GameBoard;
  player: Player;
  winner: Player | null;
  isDraw: boolean;
}

const GameContext = createContext<IGameContext | null>(null);

export class GameProvider extends Component<{}, State> {
  public readonly state: State = {
    board: Array(9).fill(null),
    player: Player.One,
    winner: null,
    isDraw: false,
  };

  public render() {
    const { board, player, winner, isDraw } = this.state;

    return (
      <GameContext.Provider
        value={{
          board,
          player,
          winner,
          isDraw,
          handleCellClick: this.handleCellClick,
          getWinner: this.getWinner,
          handleReset: this.handleReset,
        }}
      >
        {this.props.children}
      </GameContext.Provider>
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
      isDraw: newBoard.every(value => value !== null),
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

  private handleReset = () =>
    this.setState({
      winner: null,
      player: Player.One,
      board: Array(9).fill(null),
      isDraw: false,
    });
}

export const GameConsumer = GameContext.Consumer;

export default GameContext;
