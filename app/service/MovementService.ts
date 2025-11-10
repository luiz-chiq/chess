import {
  Color,
  PieceType,
  possibleMoves,
  type Board,
  type BoardPosition,
  type Piece,
} from "../types/types";

export class MovementService {

  static getPossibleMoves(
    position: BoardPosition,
    board: Board
  ): possibleMoves {

    if (!board[position].piece) return { moveset: [], piecesToCapture: [] };

    switch (board[position].piece.type) {
        case PieceType.PAWN:
            return this.getPawnMoveset(position, board);
        case PieceType.ROOK:
            return this.getRookMoveset(position, board);
        // case PieceType.KNIGHT:
        //     return this.getKnightMoveset(position, board);
        // case PieceType.BISHOP:
        //     return this.getBishopMoveset(position, board);
        // case PieceType.QUEEN:
        //     return this.getQueenMoveset(position, board);
        // case PieceType.KING:
            // return this.getKingMoveset(position, board);
        default:
            return { moveset: [], piecesToCapture: [] };
    }
  }

  static movePiece(
    piecePosition: BoardPosition,
    newPosition: BoardPosition,
    board: Board
  ): Board {

    if (board[piecePosition].piece) {

      board[newPosition].piece = board[piecePosition].piece
      board[piecePosition].piece = null;
    }

    return board
  }

  private static getPawnMoveset(
    position: BoardPosition,
    board: Board
  ): possibleMoves {
    const possibleMoves: possibleMoves = {
      moveset: [],
      piecesToCapture: []
    };
    const piece = board[position].piece;
    if (!piece) return possibleMoves;
    
    const direction = piece.color === Color.WHITE ? 1 : -1;
    const isFirstMove = piece.color === Color.WHITE && position[1] == "2" || Color.WHITE && position[1] == "7";
    const isNextSquareAvailable: boolean = parseInt(position[1]) < 8 && board[`${position[0]}${parseInt(position[1]) + 1 * direction}` as BoardPosition].piece == null;
    const isSecondSquareAvaliable: boolean = isNextSquareAvailable && isFirstMove && board[`${position[0]}${parseInt(position[1]) + 2 * direction}` as BoardPosition].piece == null;
    
    if (isNextSquareAvailable)
      possibleMoves.moveset.push(`${position[0]}${parseInt(position[1]) + 1 * direction}` as BoardPosition);

    if (isFirstMove && isSecondSquareAvaliable)
      possibleMoves.moveset.push(`${position[0]}${parseInt(position[1]) + 2 * direction}` as BoardPosition);


    return possibleMoves;
  }
  private static getRookMoveset(
    position: BoardPosition,
    board: Board
  ): possibleMoves {
    const possibleMoves: possibleMoves = {
      moveset: [],
      piecesToCapture: []
    };
    const piece = board[position].piece;
    if (!piece) return possibleMoves;
    
    const direction = piece.color === Color.WHITE ? 1 : -1;
    const isFirstMove = piece.color === Color.WHITE && position[1] == "2" || Color.WHITE && position[1] == "7";
    const isNextSquareAvailable: boolean = parseInt(position[1]) < 8 && board[`${position[0]}${parseInt(position[1]) + 1 * direction}` as BoardPosition].piece == null;
    const isSecondSquareAvaliable: boolean = isNextSquareAvailable && isFirstMove && board[`${position[0]}${parseInt(position[1]) + 2 * direction}` as BoardPosition].piece == null;
    
    if (isNextSquareAvailable)
      possibleMoves.moveset.push(`${position[0]}${parseInt(position[1]) + 1 * direction}` as BoardPosition);

    if (isFirstMove && isSecondSquareAvaliable)
      possibleMoves.moveset.push(`${position[0]}${parseInt(position[1]) + 2 * direction}` as BoardPosition);


    return possibleMoves;
  }
}