'use client';

import { BoardPosition, Color } from "@/app/src/types/types";
import { useGame } from "../../../hooks/zustand/useGame";
import { useEffect, useMemo } from "react";
import styles from "./styles.module.css";
import Piece from "../piece/Piece";

interface PieceProps {
  position: BoardPosition;
}

export default function SquareContent({ position }: PieceProps) {
  const clickedPiecePosition = useGame((state) => state.clickedPiecePosition);
  const possibleMoves = useGame((state) => state.possibleMoves);
  const turn = useGame((state) => state.turn);
  const board = useGame((state) => state.board);
  const piece = board.getPiece(position);
  const setClickedPiece = useGame((state) => state.setClickedPiece);
  const setPossibleMoves = useGame((state) => state.setPossibleMoves);
  const passturn  = useGame((state) => state.passTurn);

  const destination = useMemo(() => 
    possibleMoves.get(position) === position,
  [possibleMoves, position]);

  const isTargetPiece = useEffect(() => {
    if (!destination && possibleMoves.has(position))
        console.log(123);
    if (destination)
        console.log(possibleMoves)
    }
     ,[possibleMoves]);

  return ( 
    <div>
      <Piece position={position} />
      {possibleMoves.get(position) === position && <div style={{backgroundColor: '#777', width: 10, height: 10, borderRadius: 5}}/>}
    </div>
  );
}