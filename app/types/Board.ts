import { rootCertificates } from "tls";
import { BoardCollumn, BoardPosition, BoardRow, Color, Piece, PieceType, Square } from "./types";
import { getCol, getColIndex, getRow, getRowIndex, getBoardPositionByIndexes } from "../utils/utils";

export class Board {
    private board: Square[][];
    private ROW_MAP = "12345678";
    private COL_MAP = "ABCDEFGH";
    readonly BOARD_SIZE = 8

    constructor() {
        this.board = [];
        this.initializeBoard();
        this.initializePieces();
    }

    private initializeBoard(): void {
        
        for (let row = 0; row < this.BOARD_SIZE; row++) {

            this.board.push(new Array());
            for (let col = 0; col < this.BOARD_SIZE; col++) {
                const color = (row + col) % 2 === 0 ? Color.BLACK : Color.WHITE;
                this.board[row].push({ position: getBoardPositionByIndexes(row, col), color: color, piece: null});
            }
        }
    }

    private initializePieces(): void {
        for (let i = 0; i < 8; i++) {
            this.board[1][i].piece = { type: PieceType.PAWN, color: Color.WHITE };
            this.board[6][i].piece = { type: PieceType.PAWN , color: Color.BLACK };
        }

        const backRow: PieceType[] = [
            PieceType.ROOK,
            PieceType.KNIGHT,
            PieceType.BISHOP,
            PieceType.QUEEN,
            PieceType.KING,
            PieceType.BISHOP,
            PieceType.KNIGHT,
            PieceType.ROOK,
        ];
        for (let i = 0; i < 8; i++) {
            this.board[0][i].piece  = { type: backRow[i], color: Color.WHITE };
            this.board[7][i].piece = { type: backRow[i], color: Color.BLACK };
        }
    }

    getPiece(position: BoardPosition): Piece | null {
        return this.board[getRowIndex(position)][getColIndex(position)].piece;
    }

    movePiece(from: BoardPosition, to: BoardPosition): void {
        const fromRow =  getRowIndex(from)
        const fromCol =  getColIndex(from)
        const toRow =  getRowIndex(to)
        const toCol =  getColIndex(to)
        const piece = this.board[fromRow][fromCol].piece;
        if (!piece) return;

        this.board[toRow][toCol].piece = piece;
        this.board[fromRow][fromCol].piece = null;
    }

    public getBoard(): Square[][] {
        return this.board.map(row =>
            row.map(copy => ({
                position: copy.position,
                color: copy.color,
                piece: copy.piece ? { type: copy.piece.type, color: copy.piece.color } : null
            }))
        );
    }

    public promotePawn(position: BoardPosition, newPieceType: PieceType) {
        const row =  getRowIndex(position)
        const col =  getColIndex(position)
        if (this.board[row][col].piece?.type !== PieceType.PAWN) return ;
        if (row !== 0 && row !== 7) return;
        if (newPieceType === PieceType.KING) return;
        this.board[row][col].piece.type = newPieceType;

    }

    public getKingPosition(color: Color): BoardPosition {
        for (let i = 0; i <= 7; i++) {
            for (let j = 0; j <= 7; j++) {
                const piece = this.board[i][j].piece
                if (piece?.type === PieceType.KING && piece.color === color) return getBoardPositionByIndexes(i, j)
            }
        }
        return getBoardPositionByIndexes(0, 0)
    }
}