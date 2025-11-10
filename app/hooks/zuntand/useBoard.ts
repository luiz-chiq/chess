import { create } from "zustand";
import { Color, possibleMoves, type Board, type BoardPosition } from "../../types/types";
import { CreateBoardService } from "../../service/board/createBoardService";

type BoardStore = {
  board: Board | null;
  clickedSquare: BoardPosition | null;
  possibleMoves: possibleMoves;
  turn: Color;
  player: Color;
  setClickedSquare: (square: BoardPosition) => void;
  unsetClickedSquare: () => void;
  setPossibleMoves: (possibleMoves: possibleMoves) => void;
  passTurn: () => void;
  changePlayer: () => void;
  setBoard:(newBoard: Board) => void;
};

export const useBoard = create<BoardStore>()((set) => ({
  board: CreateBoardService.createBoard(),
  clickedSquare: null,
  possibleMoves: { moveset: [], piecesToCapture: []},
  turn: Color.WHITE,
  player: Color.WHITE,
  setClickedSquare: (position) => {
    set({ clickedSquare: position });
  },
  unsetClickedSquare: () => {
    set({ clickedSquare: null });
  },
  setPossibleMoves: (possibleMoves) => {
    set({ possibleMoves: possibleMoves})
  },
  passTurn: () => {
    set((state) => ({
      turn: state.turn === Color.WHITE ? Color.BLACK : Color.WHITE,
    }));
  },
  changePlayer: () => {
    set((state) => ({
      player: state.player === Color.WHITE ? Color.BLACK : Color.WHITE,
      clickedSquare: null,
      possibleMoves: { moveset: [], piecesToCapture: []},
    }));
  },
  setBoard: (newBoard) => {
    set((state) => ({
      board: newBoard
    }));
  }
}));
