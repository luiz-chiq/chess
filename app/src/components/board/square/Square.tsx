'use client';

import { BoardPosition, Color } from "@/app/src/types/types";
import "../../../../App.css";
import { useGame } from "../../../hooks/zustand/useGame";
import SquareContent from "./SquareContent";

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
    <div className={`square ${color}
      ${clickedPiecePosition == position ? "clicked" : "notClicked"}
      ${piece && piece.color == turn ? "allyPiece" : ""}
      `}>
        <SquareContent position={position} />
    </div>
  );
}

export default Square;
