import { Board } from '../types/Board';
import { Color, type BoardPosition } from '../types/types';
import { MovementService } from './MovementService';

export class CheckService {
  static checkCheck(
    turn: Color,
    board: Board
  ): BoardPosition | null {
    const chessBoard = board.getBoard();

    const kingPosition = board.getKingPosition(
      turn == Color.WHITE ? Color.BLACK : Color.WHITE
    );

    for (let row = 0; row < chessBoard.length; row++) {
      for (
        let col = 0;
        col < chessBoard[row].length;
        col++
      ) {
        const square = chessBoard[row][col];
        const piece = square.piece;
        if (piece && piece.color === turn) {
          const possibleMoves =
            MovementService.getPossibleMoves(
              square.position,
              board
            );
          for (const move of possibleMoves) {
            if (board.getPiece(move[0]))
              if (move[0] === kingPosition) {
                console.log(
                  'Check to',
                  turn,
                  'king at',
                  kingPosition
                );
                return kingPosition;
              }
          }
        }
      }
    }

    // chessBoard.map((row) => {
    //     row.map((square) => {
    //         const piece = square.piece;
    //         if (piece && piece.color === turn) {
    //             const possibleMoves = MovementService.getPos`sibleMoves(square.position, board);
    //             possibleMoves.forEach((move) => {
    //               if (board.getPiece(move.newPosition))
    //                 if (move.newPosition === kingPosition) {
    //                   console.log("Check to", turn, "king at", kingPosition);
    //                   return kingPosition;
    //                   check = true;
    //                 }
    //             })
    //         }
    //     })
    // })

    console.log('aaaaaa');

    return null;
  }
}
