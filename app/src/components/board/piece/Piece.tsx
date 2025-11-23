'use client';

import { BoardPosition } from "@/app/src/types/types";
import { useGame } from "../../../hooks/zustand/useGame";
import { useMemo } from "react";
import styles from "./styles.module.css";

interface PieceProps {
  position: BoardPosition;
}

export default function Piece({ position }: PieceProps) {
  const turn = useGame((state) => state.turn);
  const board = useGame((state) => state.board);
  const piece = board.getPiece(position);
  const setClickedPiece = useGame((state) => state.setClickedPiece);

  const handleClick = () => position && piece?.color === turn && setClickedPiece(position);
  

  return useMemo(() =>
    piece &&
        <img 
          onClick={handleClick} 
          className={styles.piece}
          src={`/assets/pieces/${piece.color}/${piece.type}.svg`}
          alt={`${piece.color} ${piece.type}`} 
        />
    , [piece, handleClick]);
}
