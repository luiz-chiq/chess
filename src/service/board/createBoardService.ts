import {
  Color,
  PieceType,
  SquareModifier,
  type Board,
  type BoardPosition,
  type Piece,
} from "../../types/types";

export class CreateBoardService {
  static readonly rows = 8;
  static readonly cols = 8;

  private static getPieceInitialPosition(
    position: BoardPosition
  ): Piece | void {
    if (
      position[1] != "1" &&
      position[1] != "2" &&
      position[1] != "7" &&
      position[1] != "8"
    )
      return;

    const color =
      position[1] == "1" || position[1] == "2" ? Color.WHITE : Color.BLACK;
    return this.getPieceByRelativePositionAndColor(
      this.getRelativePosition(position),
      color
    );
  }

  private static getPieceByRelativePositionAndColor(
    relativePosition: BoardPosition,
    color: Color
  ): Piece {
    if (relativePosition[1] === "2") {
      return {
        type: PieceType.PAWN,
        color: color,
      };
    }

    if (relativePosition[0] === "A" || relativePosition[0] === "H") {
      return {
        type: PieceType.ROOK,
        color: color,
      };
    }

    if (relativePosition[0] === "B" || relativePosition[0] === "G") {
      return {
        type: PieceType.KNIGHT,
        color: color,
      };
    }

    if (relativePosition[0] === "C" || relativePosition[0] === "F") {
      return {
        type: PieceType.BISHOP,
        color: color,
      };
    }

    if (relativePosition[0] === "D") {
      return {
        type: PieceType.QUEEN,
        color: color,
      };
    }

    return {
      type: PieceType.KING,
      color: color,
    };
  }

  private static getRelativePosition(position: BoardPosition): BoardPosition {
    if (position[1] == "1" || position[1] == "2") return position;
    return `${position[0]}${9 - parseInt(position[1])}` as BoardPosition;
  }

  static createBoard(): Board {
    const board: Board = {} as Board;
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        const position = `${String.fromCharCode(65 + j)}${
          this.rows - i
        }` as keyof Board;
        board[position] = {
          position,
          color: (i + j) % 2 === 0 ? Color.WHITE : Color.BLACK,
          piece: this.getPieceInitialPosition(position) || null,
          modifier: SquareModifier.NONE,
        };
      }
    }
    console.log(board);
    return board;
  }
}
