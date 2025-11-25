'use client';

import { BoardPosition, Color } from "@/app/src/types/types";
import { useGame } from "../../../hooks/zustand/useGame";
import styles from "./styles.module.css";
import PieceImage from "../piece/Piece";
import { useCallback, useEffect, useMemo } from "react";

interface SquareProps {
  color: Color;
  position: BoardPosition;
}

function Square({ position, color }: SquareProps) {
  const clickedPiecePosition = useGame((state) => state.clickedPiecePosition);
  const turn = useGame((state) => state.turn);
  const board = useGame((state) => state.board);
  const possibleMoves = useGame((state) => state.possibleMoves);
  const setClickedPiece = useGame((state) => state.setClickedPiece);
  const movePiece = useGame((state) => state.movePiece);
  
  const piece = board.getPiece(position);

  const isAllyPiece = useMemo(() => 
    piece && 
    piece.color === turn && 
    clickedPiecePosition !== position,
  [piece, turn, clickedPiecePosition, position]);

  const destination = useMemo(() => 
    possibleMoves.get(position) === position,
  [possibleMoves, position]);

  const handleClick = useCallback(() => {
    if (destination)
      return movePiece(position);
    if (isAllyPiece) 
      setClickedPiece(position);
    {possibleMoves.get(position) === position && <div className={styles.destination}/>}
  }, [destination, movePiece, position, isAllyPiece, setClickedPiece, possibleMoves]);

  return (
    <div className={`
      ${styles.square} ${styles[color]}
      ${clickedPiecePosition == position ? styles.clicked : styles.notClicked}
      ${isAllyPiece && styles.allyPiece}
      ${destination && piece && styles.checked}
      `}
      onClick={handleClick}>
        <PieceImage piece={piece} />
        {destination && !piece && <div className={styles.destination}/>}
    </div>
  );
}

export default Square;
