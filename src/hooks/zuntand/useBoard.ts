// store/useBear.ts
import { create } from "zustand";
import { Color, type Board, type BoardPosition } from "../../types/types";
import { CreateBoardService } from "../../service/board/createBoardService";

type BoardStore = {
  board: Board | null;
  clickedSquare: BoardPosition | null;
  turn: Color;
  player: Color;
  setClickedSquare: (square: BoardPosition) => void;
  passTurn: () => void;
  changePlayer: () => void;
};

export const useBoard = create<BoardStore>()((set) => ({
  board: CreateBoardService.createBoard(),
  clickedSquare: null,
  turn: Color.WHITE,
  player: Color.WHITE,
  setClickedSquare: (position) => {
    set({ clickedSquare: position });
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
    }));
  },
}));
