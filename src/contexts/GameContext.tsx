import React, { createContext, FC, useReducer } from 'react';

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

type Action =
  | { type: 'UPDATE_BOARD' | 'RESET'; index: number }
  | { type: 'RESET' };

interface State {
  board: GameBoard;
  player: Player;
  winner: Player | null;
  isDraw: boolean;
}

interface GameContextProps extends State {
  handleCellClick: (index: number) => () => void;
  handleReset: () => void;
}

const initialState: State = {
  board: Array(9).fill(null),
  player: Player.One,
  winner: null,
  isDraw: false,
};

const GameContext = createContext<GameContextProps>({
  ...initialState,
  handleCellClick: () => () => {},
  handleReset: () => {},
});

const getWinner = (board: GameBoard, player: Player) => {
  for (let index = 0; index < WINNING_LINES.length; index++) {
    const [a, b, c] = WINNING_LINES[index];
    if (board[a] !== null && board[a] === board[b] && board[a] === board[c]) {
      return player;
    }
  }
  return null;
};

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'UPDATE_BOARD':
      const newBoard = [...state.board];

      // Prevent it from updating the cell when it is not null,
      // or when there is already a winner
      if (state.board[action.index] !== null || state.winner !== null) {
        return state;
      }

      newBoard[action.index] = state.player;
      return {
        ...state,
        board: newBoard,
        player: state.player === Player.One ? Player.Two : Player.One,
        winner: getWinner(newBoard, state.player),
        isDraw: newBoard.every(value => value !== null),
      };
    case 'RESET':
      return initialState;
    default:
      return state;
  }
};

export const GameProvider: FC = ({ children }) => {
  const [{ board, player, winner, isDraw }, dispatch] = useReducer(
    reducer,
    initialState
  );

  return (
    <GameContext.Provider
      value={{
        board,
        player,
        winner,
        isDraw,
        handleCellClick: (index: number) => () =>
          dispatch({ type: 'UPDATE_BOARD', index }),
        handleReset: () => dispatch({ type: 'RESET' }),
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export const GameConsumer = GameContext.Consumer;

export default GameContext;
