import { Board } from "../types/Board";
import {
  Color,
  PieceType,
  PossibleMoves,
  type BoardPosition,
  type Piece,
} from "../types/types";
import { getColIndex, getRowIndex, getBoardPositionByIndexes, getRow, getCol } from "../utils/utils";

type Validation = (i: number, j: number) => boolean;

export const MovementService = {
  getPossibleMoves(
    position: BoardPosition,
    board: Board
  ): PossibleMoves {
    const piece = board.getPiece(position)
    const possibleMoves: PossibleMoves = new Map();

    if (piece == null) return possibleMoves;
    
    switch (piece.type) {
        case PieceType.PAWN:
            return getPawnMoveset(piece, position, board, possibleMoves);
        case PieceType.ROOK:
            return getRookMoveset(piece, position, board, possibleMoves);
        case PieceType.KNIGHT:
            return getKnightMoveset(piece, position, board, possibleMoves);
        case PieceType.BISHOP:
            return getBishopMoveset(piece, position, board, possibleMoves);
        case PieceType.QUEEN:
            return getQueenMoveset(piece, position, board, possibleMoves);
        case PieceType.KING:
            return getKingMoveset(piece, position, board, possibleMoves);
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
      board.movePiece(piecePosition, newPosition)
    return board
  }
};

  function getPawnMoveset(
    piece: Piece,
    position: BoardPosition,
    board: Board,
    possibleMoves: PossibleMoves
  ): PossibleMoves {

    const rowIndex = getRowIndex(position);
    const colIndex = getColIndex(position);
    const oppositeColor = piece.color === Color.WHITE ? Color.BLACK : Color.WHITE;
    const rightAvailable = colIndex < 7;
    const leftAvailable = colIndex > 0;    
    const direction = piece.color === Color.WHITE ? 1 : -1;
    const chessBoard = board.getBoard();

    if (rowIndex >= 7 || rowIndex <= 0) return possibleMoves;

    const isFirstMove = 
      (piece.color === Color.WHITE && rowIndex == 1) ||
       piece.color === Color.BLACK && rowIndex == 6;
    const isNextSquareAvailable: boolean = 
      board.getPiece(getBoardPositionByIndexes(rowIndex + direction, colIndex)) === null
    const isSecondSquareAvaliable: boolean =
      isFirstMove &&
      isNextSquareAvailable &&
      board.getPiece(getBoardPositionByIndexes(rowIndex + (direction * 2), colIndex)) === null
    
    if (isNextSquareAvailable) {
      const movePosition = getBoardPositionByIndexes(rowIndex + direction, colIndex)
      possibleMoves.set(movePosition, movePosition);
    }

    if (isSecondSquareAvaliable) {
      const movePosition = getBoardPositionByIndexes(rowIndex + (2 * direction), colIndex)
      possibleMoves.set(movePosition, movePosition);
    }
    const canTakeRightDiagonal = rightAvailable && 
      chessBoard[rowIndex + direction][colIndex + 1].piece?.color === oppositeColor;
    const canTakeLeftDiagonal = leftAvailable && 
      chessBoard[rowIndex + direction][colIndex - 1].piece?.color === oppositeColor;

    if (canTakeRightDiagonal) {
      const movePosition = getBoardPositionByIndexes(rowIndex + direction, colIndex + 1)
      possibleMoves.set(movePosition, movePosition);
    }
    if (canTakeLeftDiagonal) {
      const movePosition = getBoardPositionByIndexes(rowIndex + direction, colIndex - 1)
      possibleMoves.set(movePosition, movePosition);
    }
    return possibleMoves;
  }

  function getRookMoveset(
    piece: Piece,
    position: BoardPosition,
    board: Board,
    possibleMoves: PossibleMoves
  ): PossibleMoves {

    const rowIndex = getRowIndex(position);
    const colIndex = getColIndex(position);

    const chessBoard = board.getBoard();
    
    let rowUp: number = rowIndex;
    while (rowUp < 7) {
      rowUp += 1;
      const position = getBoardPositionByIndexes(rowUp, colIndex)
      if (chessBoard[rowUp][colIndex].piece?.color === piece.color) break;
      if (chessBoard[rowUp][colIndex].piece !== null) {
        possibleMoves.set(position, position)
        break;
      }
      
      possibleMoves.set(position, position)
    }
    let rowDown: number = rowIndex;
    while (rowDown > 0) {
      rowDown -= 1;
      const position = getBoardPositionByIndexes(rowDown, colIndex)
      if (chessBoard[rowDown][colIndex].piece?.color === piece.color) break;
      if (chessBoard[rowDown][colIndex].piece !== null) {
        possibleMoves.set(position, position)
        break;
      }
      
      possibleMoves.set(position, position)
    }
    let colRight: number = colIndex;
    while (colRight < 7) {
      colRight += 1;
      const position = getBoardPositionByIndexes(rowIndex, colRight)
      if (chessBoard[rowIndex][colRight].piece?.color === piece.color) break;
      if (chessBoard[rowIndex][colRight].piece !== null) {
        possibleMoves.set(position, position)
        break;
      }
      
      possibleMoves.set(position, position)
    }
    let colLeft: number = colIndex;
    while (colLeft > 0) {
      colLeft -= 1;
            
      const position = getBoardPositionByIndexes(rowIndex, colLeft)
      
      if (board.getPiece(position)?.color === piece.color) break;
      
      possibleMoves.set(position, position)
      
      if (board.getPiece(position)) break;
    }

    return possibleMoves;
  }

  function getKnightMoveset(
    piece: Piece,
    position: BoardPosition,
    board: Board,
    possibleMoves: PossibleMoves
  ): PossibleMoves {

    const rowIndex = getRowIndex(position);
    const colIndex = getColIndex(position);

    if (rowIndex + 2 <= 7 && colIndex + 1 <= 7) {
      const movePosition = getBoardPositionByIndexes(rowIndex + 2, colIndex + 1)
      if (board.getPiece(movePosition)?.color !== piece.color)
        possibleMoves.set(movePosition, movePosition);
    }
    if (rowIndex + 2 <= 7 && colIndex - 1 >= 0) {
      const movePosition = getBoardPositionByIndexes(rowIndex + 2, colIndex - 1)
      if (board.getPiece(movePosition)?.color !== piece.color)
        possibleMoves.set(movePosition, movePosition);
    }
    if (rowIndex - 2 >= 0 && colIndex + 1 <= 7) {
      const movePosition = getBoardPositionByIndexes(rowIndex - 2, colIndex + 1)
      if (board.getPiece(movePosition)?.color !== piece.color)
        possibleMoves.set(movePosition, movePosition);
    }
    if (rowIndex - 2 >= 0 && colIndex - 1 >= 0) {
      const movePosition = getBoardPositionByIndexes(rowIndex - 2, colIndex - 1)
      if (board.getPiece(movePosition)?.color !== piece.color)
        possibleMoves.set(movePosition, movePosition);
    }
    if (rowIndex + 1 <= 7 && colIndex + 2 <= 7) {
      const movePosition = getBoardPositionByIndexes(rowIndex + 1, colIndex + 2 )
      if (board.getPiece(movePosition)?.color !== piece.color)
        possibleMoves.set(movePosition, movePosition);
    }
    if (rowIndex + 1 <= 7 && colIndex - 2 >= 0) {
      const movePosition = getBoardPositionByIndexes(rowIndex + 1, colIndex - 2)
      if (board.getPiece(movePosition)?.color !== piece.color)
        possibleMoves.set(movePosition, movePosition);
    }
    if (rowIndex - 1 >= 0 && colIndex + 2 <= 7) {
      const movePosition = getBoardPositionByIndexes(rowIndex - 1, colIndex + 2)
      if (board.getPiece(movePosition)?.color !== piece.color)
        possibleMoves.set(movePosition, movePosition);
    }
    if (rowIndex - 1 >= 0 && colIndex - 2 >= 0) {
      const movePosition = getBoardPositionByIndexes(rowIndex - 1, colIndex - 2)
      if (board.getPiece(movePosition)?.color !== piece.color)
        possibleMoves.set(movePosition, movePosition);
    }

    return possibleMoves;
  }
  
  function getBishopMoveset(
    piece: Piece,
    position: BoardPosition,
    board: Board,
    possibleMoves: PossibleMoves
  ): PossibleMoves {

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

        possibleMoves.set(position, position)

        if (board.getPiece(position)) break;
      }
    }
    getDiagonalMoveset(upRightValidation, 1, 1);
    getDiagonalMoveset(upLeftValidation, 1, -1);
    getDiagonalMoveset(downRightValidation, -1, 1);
    getDiagonalMoveset(downLeftValidation, -1, -1);

    return possibleMoves;
  }
  
  function getQueenMoveset(
    piece: Piece,
    position: BoardPosition,
    board: Board,
    possibleMoves: PossibleMoves
  ): PossibleMoves {
    getBishopMoveset(piece, position, board, possibleMoves)
    getRookMoveset(piece, position, board, possibleMoves)
  
    return possibleMoves;
  }

  function getKingMoveset(
    piece: Piece,
    position: BoardPosition,
    board: Board,
    possibleMoves: PossibleMoves
  ): PossibleMoves {

    const rowIndex = getRowIndex(position);
    const colIndex = getColIndex(position);
    const oppositeColor = piece.color === Color.WHITE ? Color.BLACK : Color.WHITE;

    const opponentKingPosition = board.getKingPosition(oppositeColor)
    const opponentKingRowIndex = getRowIndex(opponentKingPosition);
    const opponentKingColIndex = getColIndex(opponentKingPosition);

    const circle = getKingMovementCircle(rowIndex, colIndex)

    const opponentKingCircle = getKingMovementCircle(opponentKingRowIndex, opponentKingColIndex);
    
    circle.filter((position) => opponentKingCircle.includes(position))
    
    circle.forEach((position) => {
      if (opponentKingCircle.includes(position)) return;
      if (board.getPiece(position)?.color === piece.color) return;
      possibleMoves.set(position, position)
    })

    return possibleMoves;
  }

  function getKingMovementCircle(rowIndex: number, colIndex: number): BoardPosition[] {

    const circle: BoardPosition[] = []

    const rightAvailable = colIndex < 7;
    const leftAvailable = colIndex > 0;
    const upAvailable = rowIndex < 7;
    const downAvailable = rowIndex > 0;

    if (upAvailable) 
      circle.push(getBoardPositionByIndexes(rowIndex + 1, colIndex));
    if (rightAvailable && upAvailable) 
      circle.push(getBoardPositionByIndexes(rowIndex + 1, colIndex + 1));
    if (rightAvailable) 
      circle.push(getBoardPositionByIndexes(rowIndex, colIndex + 1));
    if (downAvailable && rightAvailable) 
      circle.push(getBoardPositionByIndexes(rowIndex - 1, colIndex + 1));
    if (downAvailable) 
      circle.push(getBoardPositionByIndexes(rowIndex - 1, colIndex));
    if (downAvailable && leftAvailable) 
      circle.push(getBoardPositionByIndexes(rowIndex - 1, colIndex - 1));
    if (leftAvailable) 
      circle.push(getBoardPositionByIndexes(rowIndex, colIndex - 1));
    if (upAvailable && leftAvailable) 
      circle.push(getBoardPositionByIndexes(rowIndex + 1, colIndex - 1));

    return circle;
  }
