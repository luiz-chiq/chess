export enum Color {
  WHITE = 'white',
  BLACK = 'black',
}
export type BoardRow = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
export type BoardCollumn =
  | 'A'
  | 'B'
  | 'C'
  | 'D'
  | 'E'
  | 'F'
  | 'G'
  | 'H';
export type BoardPosition = `${BoardCollumn}${BoardRow}`;
export type Square = {
  position: BoardPosition;
  color: Color;
  piece: Piece | null;
};
export type Piece = {
  type: PieceType;
  color: Color;
};
export enum PieceType {
  PAWN = 'pawn',
  ROOK = 'rook',
  KNIGHT = 'knight',
  BISHOP = 'bishop',
  QUEEN = 'queen',
  KING = 'king',
}
export type PossibleMoves = Map<
  BoardPosition,
  BoardPosition
>;
