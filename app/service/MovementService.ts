import { Board } from "../types/Board";
import {
  Color,
  PieceType,
  PossibleMove,
  type BoardPosition,
  type Piece,
} from "../types/types";
import { getColIndex, getRowIndex, getBoardPositionByIndexes, getRow, getCol } from "../utils/utils";

type Validation = (i: number, j: number) => boolean;

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
        case PieceType.ROOK:
            return this.getRookMoveset(piece, position, board);
        case PieceType.KNIGHT:
            return this.getKnightMoveset(piece, position, board);
        case PieceType.BISHOP:
            return this.getBishopMoveset(piece, position, board);
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

  private static getRookMoveset(
    piece: Piece,
    position: BoardPosition,
    board: Board
  ): PossibleMove[] {
    const possibleMoves: PossibleMove[] = [];

    const rowIndex = getRowIndex(position);
    const colIndex = getColIndex(position);

    const chessBoard = board.getBoard();
    
    let rowUp: number = rowIndex;
    while (rowUp < 7) {
      rowUp += 1;
      const position = getBoardPositionByIndexes(rowUp, colIndex)
      console.log(chessBoard[rowUp][colIndex].piece?.color, piece.color)
      if (chessBoard[rowUp][colIndex].piece?.color === piece.color) break;
      if (chessBoard[rowUp][colIndex].piece !== null) {
        possibleMoves.push({ newPosition: position, targetPiece: position })
        break;
      }
      
      possibleMoves.push({ newPosition: position, targetPiece: position })
    }
    let rowDown: number = rowIndex;
    while (rowDown > 0) {
      rowDown -= 1;
      const position = getBoardPositionByIndexes(rowDown, colIndex)
      console.log(chessBoard[rowDown][colIndex].piece?.color, piece.color)
      if (chessBoard[rowDown][colIndex].piece?.color === piece.color) break;
      if (chessBoard[rowDown][colIndex].piece !== null) {
        possibleMoves.push({ newPosition: position, targetPiece: position })
        break;
      }
      
      possibleMoves.push({ newPosition: position, targetPiece: position })
    }
    let colRight: number = colIndex;
    while (colRight < 7) {
      colRight += 1;
      const position = getBoardPositionByIndexes(rowIndex, colRight)
      console.log(chessBoard[rowIndex][colRight].piece?.color, piece.color)
      if (chessBoard[rowIndex][colRight].piece?.color === piece.color) break;
      if (chessBoard[rowIndex][colRight].piece !== null) {
        possibleMoves.push({ newPosition: position, targetPiece: position })
        break;
      }
      
      possibleMoves.push({ newPosition: position, targetPiece: position })
    }
    let colLeft: number = colIndex;
    while (colLeft > 0) {
      colLeft -= 1;
      const position = getBoardPositionByIndexes(rowIndex, colLeft)
      console.log(chessBoard[rowIndex][colLeft].piece?.color, piece.color)
      if (chessBoard[rowIndex][colLeft].piece?.color === piece.color) break;
      if (chessBoard[rowIndex][colLeft].piece !== null) {
        possibleMoves.push({ newPosition: position, targetPiece: position })
        break;
      }
      console.log(possibleMoves)
      
      possibleMoves.push({ newPosition: position, targetPiece: position })
    }

    return possibleMoves;
  }

  private static getKnightMoveset(
    piece: Piece,
    position: BoardPosition,
    board: Board
  ): PossibleMove[] {
    const possibleMoves: PossibleMove[] = [];

    const rowIndex = getRowIndex(position);
    const colIndex = getColIndex(position);

    if (rowIndex + 2 <= 7 && colIndex + 1 <= 7) {
      const movePosition = getBoardPositionByIndexes(rowIndex + 2, colIndex + 1)
      if (board.getPiece(movePosition)?.color !== piece.color)
        possibleMoves.push({ newPosition: movePosition, targetPiece: movePosition });
    }
    if (rowIndex + 2 <= 7 && colIndex - 1 >= 0) {
      const movePosition = getBoardPositionByIndexes(rowIndex + 2, colIndex - 1)
      if (board.getPiece(movePosition)?.color !== piece.color)
        possibleMoves.push({ newPosition: movePosition, targetPiece: movePosition });
    }
    if (rowIndex - 2 >= 0 && colIndex + 1 <= 7) {
      const movePosition = getBoardPositionByIndexes(rowIndex - 2, colIndex + 1)
      if (board.getPiece(movePosition)?.color !== piece.color)
        possibleMoves.push({ newPosition: movePosition, targetPiece: movePosition });
    }
    if (rowIndex - 2 >= 0 && colIndex - 1 >= 0) {
      const movePosition = getBoardPositionByIndexes(rowIndex - 2, colIndex - 1)
      if (board.getPiece(movePosition)?.color !== piece.color)
        possibleMoves.push({ newPosition: movePosition, targetPiece: movePosition });
    }
    if (rowIndex + 1 <= 7 && colIndex + 2 <= 7) {
      const movePosition = getBoardPositionByIndexes(rowIndex + 1, colIndex + 2 )
      if (board.getPiece(movePosition)?.color !== piece.color)
        possibleMoves.push({ newPosition: movePosition, targetPiece: movePosition });
    }
    if (rowIndex + 1 <= 7 && colIndex - 2 >= 0) {
      const movePosition = getBoardPositionByIndexes(rowIndex + 1, colIndex - 2)
      if (board.getPiece(movePosition)?.color !== piece.color)
        possibleMoves.push({ newPosition: movePosition, targetPiece: movePosition });
    }
    if (rowIndex - 1 >= 0 && colIndex + 2 <= 7) {
      const movePosition = getBoardPositionByIndexes(rowIndex - 1, colIndex + 2)
      if (board.getPiece(movePosition)?.color !== piece.color)
        possibleMoves.push({ newPosition: movePosition, targetPiece: movePosition });
    }
    if (rowIndex - 1 >= 0 && colIndex - 2 >= 0) {
      const movePosition = getBoardPositionByIndexes(rowIndex - 1, colIndex - 2)
      if (board.getPiece(movePosition)?.color !== piece.color)
        possibleMoves.push({ newPosition: movePosition, targetPiece: movePosition });
    }

    return possibleMoves;
  }
  
  private static getBishopMoveset(
    piece: Piece,
    position: BoardPosition,
    board: Board
  ): PossibleMove[] {
    const possibleMoves: PossibleMove[] = [];

    const rowIndex = getRowIndex(position);
    const colIndex = getColIndex(position);

    const upRightValidation = (i: number, j: number): boolean => i < 7 && j < 7
    const upLeftValidation = (i: number, j: number): boolean => i < 7 && j > 0
    const downRightValidation = (i: number, j: number): boolean => i > 0 && j < 7
    const downLeftValidation = (i: number, j: number): boolean => i > 0 && j > 0
    
    const getDiagonalMoveset = (validation: Validation, verticalDirection: number, horizontalDirection: number) => {
      let i: number = rowIndex;
      let j: number = colIndex;
      while (validation(i, j)) {
        i += verticalDirection;
        j += horizontalDirection;

        const position = getBoardPositionByIndexes(i, j)

        if (board.getPiece(position)?.color === piece.color) break;

        possibleMoves.push({ newPosition: position, targetPiece: position })

        if (board.getPiece(position)) break;
      }
    }
    getDiagonalMoveset(upRightValidation, 1, 1);
    getDiagonalMoveset(upLeftValidation, 1, -1);
    getDiagonalMoveset(downRightValidation, -1, 1);
    getDiagonalMoveset(downLeftValidation, -1, -1);

    return possibleMoves;
  }
}