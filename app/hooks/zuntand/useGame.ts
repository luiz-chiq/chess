import { Board } from '@/app/types/Board'
import { BoardPosition, Color, PossibleMove } from '@/app/types/types'
import { create } from 'zustand'

interface GameState {
  board: Board
  player: Color
  clickedPiece: BoardPosition | null
  turn: Color
  possibleMoves: PossibleMove[]
  movePiece: (from:BoardPosition, to: BoardPosition) => void
  setClickedPiece: (piecePosition: BoardPosition) => void
  unsetClickedPiece: () => void
  passTurn: () => void
  setPossibleMoves: (possibleMoves: PossibleMove[]) => void
}


export const useGame = create<GameState>()(
    (set) => ({
      board: new Board(),
      player: Color.WHITE,
      clickedPiece: null,
      turn: Color.WHITE,
      possibleMoves: [],
      movePiece: (from, to) =>
        set((state) => {
          state.board.movePiece(from, to);
          return { board: state.board };
        }),
      setClickedPiece: (piecePosition) => {
        set((state) => ({
          clickedPiece: piecePosition
        }))
      },
      unsetClickedPiece: () => {
        set((state) => ({
          clickedPiece: null
        }))
      },
      passTurn: () => set((state) => ({
         turn : state.turn == Color.WHITE ? Color.BLACK : Color.WHITE,
         clickedPiece: null,
         possibleMoves: []
      })),
      setPossibleMoves: (possibleMoves) => {
        set((state) => ({
          possibleMoves: possibleMoves
        }))
      }
    }),
)