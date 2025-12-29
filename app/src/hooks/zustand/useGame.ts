import { CheckService } from '@/app/src/services/CheckService';
import { MovementService } from '@/app/src/services/MovementService';
import { Board } from '@/app/src/types/Board';
import {
  BoardPosition,
  Color,
  ForbiddenKingPosition,
  PieceType,
  PossibleMoves,
} from '@/app/src/types/types';
import { create } from 'zustand';

interface GameState {
  board: Board;
  player: Color;
  clickedPiecePosition: BoardPosition | null;
  forbiddenKingPosition: ForbiddenKingPosition;
  turn: Color;
  possibleMoves: PossibleMoves;
  showSquarePosition: boolean;
  showPromotionModal: boolean;
  lastMovePosition: BoardPosition | null;
  whiteBasket: PieceType[];
  blackBasket: PieceType[];
  movePiece: (to: BoardPosition) => void;
  setClickedPiece: (piecePosition: BoardPosition) => void;
  passTurn: () => void;
  setPossibleMoves: (possibleMoves: PossibleMoves) => void;
  toggleShowSquarePosition: () => void;
  setShowPromotionModal: (show: boolean) => void;
  addPieceToBasket: (
    color: Color,
    pieceType: PieceType
  ) => void;
}

export const useGame = create<GameState>()((set) => ({
  board: new Board(),
  player: Color.WHITE,
  clickedPiecePosition: null,
  forbiddenKingPosition: {
    unsafePositions: new Set(),
    checkPosition: null,
  },
  turn: Color.WHITE,
  possibleMoves: new Map(),
  showSquarePosition: true,
  showPromotionModal: false,
  lastMovePosition: null,
  whiteBasket: [],
  blackBasket: [],
  passTurn: () =>
    set((state) => {
      return {
        possibleMoves: new Map(),
        turn:
          state.turn == Color.WHITE
            ? Color.BLACK
            : Color.WHITE,
        clickedPiecePosition: null,
      };
    }),
  movePiece: (to) =>
    set((state) => {
      const piece = state.board.getPiece(to);
      if (piece) {
        state.addPieceToBasket(piece.color, piece.type);
      }
      MovementService.movePiece(
        state.clickedPiecePosition!,
        to,
        state.board
      );
      state.passTurn();
      return {
        lastMovePosition: to,
        possibleMoves: new Map(),
        checkPosition: CheckService.checkCheck(
          state.turn,
          state.board
        ),
      };
    }),
  setClickedPiece: (piecePosition) => {
    set((state) => ({
      possibleMoves: MovementService.getPossibleMoves(
        piecePosition,
        state.board
      ),
      clickedPiecePosition: piecePosition,
    }));
  },
  setPossibleMoves: (possibleMoves) => {
    set(() => ({
      possibleMoves: possibleMoves,
    }));
  },
  toggleShowSquarePosition: () =>
    set((state) => ({
      showSquarePosition: !state.showSquarePosition,
    })),
  setShowPromotionModal: (show) =>
    set(() => ({
      showPromotionModal: show,
    })),
  addPieceToBasket: (color, pieceType) => {
    console.log('Adding to basket:', color, pieceType);
    set((state) => {
      if (color === Color.WHITE) {
        return {
          whiteBasket: [...state.whiteBasket, pieceType],
        };
      } else {
        return {
          blackBasket: [...state.blackBasket, pieceType],
        };
      }
    });
  },
}));
