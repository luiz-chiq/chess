import { Board } from "../types/Board";
import {
  Color,
  PieceType,
  PossibleMove,
  type BoardPosition,
  type Piece,
} from "../types/types";
import { getColIndex, getRowIndex, getBoardPositionByIndexes, getRow, getCol } from "../utils/utils";

export class MovementService {

  static getPossibleMoves(
    position: BoardPosition,
    board: Board
  ): PossibleMove[] {

    const piece = board.getPiece(position)

    if (piece == null) return [];

    switch (piece.type) {
        case PieceType.PAWN:
            return this.getPawnMoveset(piece, position, board);
        // case PieceType.ROOK:
        //     return this.getRookMoveset(piece, position, board);
        // case PieceType.KNIGHT:
        //     return this.getKnightMoveset(piece, position, board);
        // case PieceType.BISHOP:
        //     return this.getBishopMoveset(piece, position, board);
        // case PieceType.QUEEN:
        //     return this.getQueenMoveset(piece, position, board);
        // case PieceType.KING:
            // return this.getKingMoveset(pieace, position, board);
        default:
            return [];
    }
  }

  static movePiece(
    piecePosition: BoardPosition,
    newPosition: BoardPosition,
    board: Board
  ): Board {

    if (board.getPiece(piecePosition)) board.movePiece(piecePosition, newPosition)

    return board
  }

  private static getPawnMoveset(
    piece: Piece,
    position: BoardPosition,
    board: Board
  ): PossibleMove[] {
    const possibleMoves: PossibleMove[] = [];

    const rowIndex = getRowIndex(position);
    const colIndex = getColIndex(position);
    const oppositeColor = piece.color === Color.WHITE ? Color.BLACK : Color.WHITE;
    const rightAvailable = colIndex < 7;
    const leftAvailable = colIndex > 0;    
    const direction = piece.color === Color.WHITE ? 1 : -1;
    const chessBoard = board.getBoard();

    const isFirstMove = 
      (piece.color === Color.WHITE && rowIndex == 1) ||
       piece.color === Color.BLACK && rowIndex == 6;
    const isNextSquareAvailable: boolean = 
      rowIndex < 8 &&
      board.getPiece(getBoardPositionByIndexes(rowIndex + direction, colIndex)) === null
    const isSecondSquareAvaliable: boolean =
      isFirstMove &&
      isNextSquareAvailable &&
      board.getPiece(getBoardPositionByIndexes(rowIndex + (direction * 2), colIndex)) === null
    
    if (isNextSquareAvailable) {
      const movePosition = getBoardPositionByIndexes(rowIndex + (1 * direction), colIndex)
      possibleMoves.push({ newPosition: movePosition, targetPiece: movePosition });
    }

    if (isSecondSquareAvaliable) {
      const movePosition = getBoardPositionByIndexes(rowIndex + (2 * direction), colIndex)
      possibleMoves.push({ newPosition: movePosition, targetPiece: movePosition });
    }
    const canTakeRightDiagonal = rightAvailable && 
      chessBoard[rowIndex + direction][colIndex + 1].piece?.color === oppositeColor;
    const canTakeLeftDiagonal = leftAvailable && 
      chessBoard[rowIndex + direction][colIndex - 1].piece?.color === oppositeColor;

    if (canTakeRightDiagonal) {
      const movePosition = getBoardPositionByIndexes(rowIndex + direction, colIndex + 1)
      possibleMoves.push({ newPosition: movePosition, targetPiece: movePosition });
    }
    if (canTakeLeftDiagonal) {
      const movePosition = getBoardPositionByIndexes(rowIndex + direction, colIndex - 1)
      possibleMoves.push({ newPosition: movePosition, targetPiece: movePosition });
    }
    return possibleMoves;
  }

}