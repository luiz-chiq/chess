import { Board } from '../types/Board';
import { Piece, type BoardPosition } from '../types/types';
import {
  getColIndex,
  getRowIndex,
  getBoardPositionByIndexes,
} from '../utils/utils';

export const MovementPatternService = {
  getRookMovementPattern(
    position: BoardPosition,
    board: Board
  ): BoardPosition[] {
    const piece = board.getPiece(position);
    const pattern: BoardPosition[] = [];
    const row = getRowIndex(position);
    const col = getColIndex(position);

    if (!piece) return pattern;

    lineIterator(pattern, 1, 0, row, col, piece, board);
    lineIterator(pattern, -1, 0, row, col, piece, board);
    lineIterator(pattern, 0, 1, row, col, piece, board);
    lineIterator(pattern, 0, -1, row, col, piece, board);

    return pattern;
  },
  getBishopMovementPattern(
    position: BoardPosition,
    board: Board
  ): BoardPosition[] {
    const piece = board.getPiece(position);
    const pattern: BoardPosition[] = [];
    const row = getRowIndex(position);
    const col = getColIndex(position);

    if (!piece) return pattern;

    lineIterator(pattern, 1, 1, row, col, piece, board);
    lineIterator(pattern, 1, -1, row, col, piece, board);
    lineIterator(pattern, -1, 1, row, col, piece, board);
    lineIterator(pattern, -1, -1, row, col, piece, board);

    return pattern;
  },

  getQueenMovementPattern(
    position: BoardPosition,
    board: Board
  ): BoardPosition[] {
    const piece = board.getPiece(position);
    const pattern: BoardPosition[] = [];
    const row = getRowIndex(position);
    const col = getColIndex(position);

    if (!piece) return pattern;

    lineIterator(pattern, 1, 0, row, col, piece, board);
    lineIterator(pattern, -1, 0, row, col, piece, board);
    lineIterator(pattern, 0, 1, row, col, piece, board);
    lineIterator(pattern, 0, -1, row, col, piece, board);
    lineIterator(pattern, 1, 1, row, col, piece, board);
    lineIterator(pattern, 1, -1, row, col, piece, board);
    lineIterator(pattern, -1, 1, row, col, piece, board);
    lineIterator(pattern, -1, -1, row, col, piece, board);

    return pattern;
  },
  getKnightMovementPattern(
    position: BoardPosition,
    board: Board
  ): BoardPosition[] {
    const piece = board.getPiece(position);
    const pattern: BoardPosition[] = [];
    const rowIndex = getRowIndex(position);
    const colIndex = getColIndex(position);

    if (!piece) return pattern;

    const offsets = [
      [2, 1],
      [2, -1],
      [-2, 1],
      [-2, -1],
      [1, 2],
      [1, -2],
      [-1, 2],
      [-1, -2],
    ];

    offsetInterator(
      pattern,
      offsets,
      rowIndex,
      colIndex,
      piece,
      board
    );

    return pattern;
  },
  getKingMovementPattern(
    position: BoardPosition,
    board: Board
  ): BoardPosition[] {
    const piece = board.getPiece(position);
    const pattern: BoardPosition[] = [];
    const rowIndex = getRowIndex(position);
    const colIndex = getColIndex(position);

    if (!piece) return pattern;

    const offsets = [
      [1, 0],
      [1, 1],
      [0, 1],
      [-1, 1],
      [-1, 0],
      [-1, -1],
      [0, -1],
      [1, -1],
    ];

    offsetInterator(
      pattern,
      offsets,
      rowIndex,
      colIndex,
      piece,
      board
    );

    return pattern;
  },
};

function lineIterator(
  initialArray: BoardPosition[],
  verticalDirection: number,
  horizontalDirection: number,
  row: number,
  col: number,
  piece: Piece,
  board: Board
): BoardPosition[] {
  if (verticalDirection === 0 && horizontalDirection === 0)
    return initialArray;

  const limit = board.BOARD_SIZE - 1;

  while (
    row + horizontalDirection >= 0 &&
    row + horizontalDirection <= limit &&
    col + verticalDirection >= 0 &&
    col + verticalDirection <= limit
  ) {
    row += horizontalDirection;
    col += verticalDirection;

    const position = getBoardPositionByIndexes(row, col);
    const pieceAtPosition = board.getPiece(position);

    if (pieceAtPosition?.color === piece.color) break;

    initialArray.push(position);

    if (pieceAtPosition) break;
  }

  return initialArray;
}

function offsetInterator(
  initialArray: BoardPosition[],
  offsets: number[][],
  row: number,
  col: number,
  piece: Piece,
  board: Board
): BoardPosition[] {
  const LIMIT = board.BOARD_SIZE - 1;

  offsets.forEach(([rowOffset, colOffset]) => {
    const newRow = row + rowOffset;
    const newCol = col + colOffset;

    if (
      newRow >= 0 &&
      newRow <= LIMIT &&
      newCol >= 0 &&
      newCol <= LIMIT
    ) {
      const movePosition = getBoardPositionByIndexes(newRow, newCol);
      if (board.getPiece(movePosition)?.color !== piece.color)
        initialArray.push(movePosition);
    }
  });

  return initialArray;
}
