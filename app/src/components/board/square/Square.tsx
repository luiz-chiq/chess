'use client';

import { BoardPosition, Color } from "@/app/src/types/types";
import { useGame } from "../../../hooks/zustand/useGame";
import SquareContent from "./SquareContent";
import styles from "./styles.module.css";

interface SquareProps {
  color: Color;
  position: BoardPosition;
}

function Square({ position, color }: SquareProps) {
  const clickedPiecePosition = useGame((state) => state.clickedPiecePosition);
  const turn = useGame((state) => state.turn);
  const board = useGame((state) => state.board);
  const piece = board.getPiece(position);

  return (
    <div className={`${styles.square} ${styles[color]}
      ${clickedPiecePosition == position ? styles.clicked : styles.notClicked}
      ${piece && piece.color == turn && styles.allyPiece}
      `}>
        <SquareContent position={position} />
    </div>
  );
}

export default Square;
