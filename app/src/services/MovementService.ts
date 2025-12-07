import { Board } from '../types/Board';
import {
  Color,
  PieceType,
  PossibleMoves,
  type BoardPosition,
  type Piece,
} from '../types/types';
import {
  getColIndex,
  getRowIndex,
  getBoardPositionByIndexes,
} from '../utils/utils';
import { MovementPatternService } from './MovementPatternService';

export const MovementService = {
  getPossibleMoves(
    position: BoardPosition,
    board: Board
  ): PossibleMoves {
    const piece = board.getPiece(position);
    const possibleMoves: PossibleMoves = new Map();

    if (piece == null) return possibleMoves;

    switch (piece.type) {
      case PieceType.PAWN:
        return getPawnMoves(piece, position, board, possibleMoves);
      case PieceType.ROOK:
        return getRookMoves(position, board, possibleMoves);
      case PieceType.KNIGHT:
        return getKnightMoves(position, board, possibleMoves);
      case PieceType.BISHOP:
        return getBishopMoves(position, board, possibleMoves);
      case PieceType.QUEEN:
        return getQueenMoves(position, board, possibleMoves);
      case PieceType.KING:
        return getKingMoves(piece, position, board, possibleMoves);
      default:
        return possibleMoves;
    }
  },
  movePiece(
    piecePosition: BoardPosition,
    newPosition: BoardPosition,
    board: Board
  ): Board {
    if (board.getPiece(piecePosition))
      board.movePiece(piecePosition, newPosition);
    return board;
  },
};

function getPawnMoves(
  piece: Piece,
  position: BoardPosition,
  board: Board,
  possibleMoves: PossibleMoves
): PossibleMoves {
  const rowIndex = getRowIndex(position);
  const colIndex = getColIndex(position);
  const oppositeColor =
    piece.color === Color.WHITE ? Color.BLACK : Color.WHITE;
  const rightAvailable = colIndex < 7;
  const leftAvailable = colIndex > 0;
  const direction = piece.color === Color.WHITE ? 1 : -1;
  const chessBoard = board.getBoard();

  if (rowIndex >= 7 || rowIndex <= 0) return possibleMoves;

  const isFirstMove =
    (piece.color === Color.WHITE && rowIndex == 1) ||
    (piece.color === Color.BLACK && rowIndex == 6);
  const isNextSquareAvailable: boolean =
    board.getPiece(
      getBoardPositionByIndexes(rowIndex + direction, colIndex)
    ) === null;
  const isSecondSquareAvaliable: boolean =
    isFirstMove &&
    isNextSquareAvailable &&
    board.getPiece(
      getBoardPositionByIndexes(rowIndex + direction * 2, colIndex)
    ) === null;

  if (isNextSquareAvailable) {
    const movePosition = getBoardPositionByIndexes(
      rowIndex + direction,
      colIndex
    );
    possibleMoves.set(movePosition, movePosition);
  }

  if (isSecondSquareAvaliable) {
    const movePosition = getBoardPositionByIndexes(
      rowIndex + 2 * direction,
      colIndex
    );
    possibleMoves.set(movePosition, movePosition);
  }
  const canTakeRightDiagonal =
    rightAvailable &&
    chessBoard[rowIndex + direction][colIndex + 1].piece?.color ===
      oppositeColor;
  const canTakeLeftDiagonal =
    leftAvailable &&
    chessBoard[rowIndex + direction][colIndex - 1].piece?.color ===
      oppositeColor;

  if (canTakeRightDiagonal) {
    const movePosition = getBoardPositionByIndexes(
      rowIndex + direction,
      colIndex + 1
    );
    possibleMoves.set(movePosition, movePosition);
  }
  if (canTakeLeftDiagonal) {
    const movePosition = getBoardPositionByIndexes(
      rowIndex + direction,
      colIndex - 1
    );
    possibleMoves.set(movePosition, movePosition);
  }
  return possibleMoves;
}

function getRookMoves(
  position: BoardPosition,
  board: Board,
  possibleMoves: PossibleMoves
): PossibleMoves {
  MovementPatternService.getRookMovementPattern(
    position,
    board
  ).forEach((pos) => {
    possibleMoves.set(pos, pos);
  });

  return possibleMoves;
}

function getKnightMoves(
  position: BoardPosition,
  board: Board,
  possibleMoves: PossibleMoves
): PossibleMoves {
  MovementPatternService.getKnightMovementPattern(
    position,
    board
  ).forEach((pos) => {
    possibleMoves.set(pos, pos);
  });

  return possibleMoves;
}

function getBishopMoves(
  position: BoardPosition,
  board: Board,
  possibleMoves: PossibleMoves
): PossibleMoves {
  MovementPatternService.getBishopMovementPattern(
    position,
    board
  ).forEach((pos) => {
    possibleMoves.set(pos, pos);
  });

  return possibleMoves;
}

function getQueenMoves(
  position: BoardPosition,
  board: Board,
  possibleMoves: PossibleMoves
): PossibleMoves {
  MovementPatternService.getQueenMovementPattern(
    position,
    board
  ).forEach((pos) => {
    possibleMoves.set(pos, pos);
  });

  return possibleMoves;
}

function getKingMoves(
  piece: Piece,
  position: BoardPosition,
  board: Board,
  possibleMoves: PossibleMoves
): PossibleMoves {
  MovementPatternService.getKingMovementPattern(
    position,
    board
  ).forEach((pos) => {
    possibleMoves.set(pos, pos);
  });

  return possibleMoves;
}
