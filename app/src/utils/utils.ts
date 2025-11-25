import {
  BoardCollumn,
  BoardPosition,
  BoardRow,
} from '../types/types';

export function getRow(index: number): BoardRow {
  return (index + 1) as BoardRow;
}

export function getCol(index: number): BoardCollumn {
  return String.fromCharCode(65 + index) as BoardCollumn;
}

export function getBoardPositionByIndexes(
  row: number,
  col: number
): BoardPosition {
  return (getCol(col) + getRow(row)) as BoardPosition;
}

export function getRowIndex(
  position: BoardPosition
): number {
  return parseInt(position[1]) - 1;
}

export function getColIndex(
  position: BoardPosition
): number {
  return position.charCodeAt(0) - 65;
}
