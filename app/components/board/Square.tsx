'use client';

import { MovementService } from "@/app/service/MovementService";
import "../../App.css";
import { useBoard } from "../../hooks/zuntand/useBoard";
import { type BoardPosition, type Color, type Piece } from "../../types/types";
import { useMemo } from "react";

interface SquareProps {
  color: Color;
  position: BoardPosition;
}

function Square({ position, color }: SquareProps) {
  const clickedSquare = useBoard((state) => state.clickedSquare);
  const possibleMoves = useBoard((state) => state.possibleMoves);
  const playerColor = useBoard((state) => state.player);
  const turn = useBoard((state) => state.turn);
  const board = useBoard((state) => state.board);
  const piece = board![position]?.piece
  
  const setClickedSquare = useBoard((state) => state.setClickedSquare);
  const unsetClickedSquare = useBoard((state) => state.unsetClickedSquare);
  const setPossibleMoves = useBoard((state) => state.setPossibleMoves);
  const passturn  = useBoard((state) => state.passTurn);
  const changePlayer  = useBoard((state) => state.changePlayer);
  const setBoard = useBoard((state) => state.setBoard);


  const image = useMemo(() =>
    piece &&
        <img src={`/assets/pieces/${piece.color}/${piece.type}.svg`} alt={`${piece.color} ${piece.type}`} />
      , [piece]);

  const handleClick = () => {
    console.log(piece);
    if (!position || playerColor !== turn) return;
    if (!possibleMoves.moveset.includes(position)) {
      if (piece?.color !== playerColor) return;
      setClickedSquare(position);
      setPossibleMoves(MovementService.getPossibleMoves(position, board!));
      return;
    }
    setBoard(MovementService.movePiece(clickedSquare!, position, board!))
    unsetClickedSquare();
    setPossibleMoves({ moveset: [], piecesToCapture: []});
    passturn();
    changePlayer();
    
  };


  return (
    <div
      className={`square ${color}
      ${clickedSquare == position ? "clicked" : "notClicked"}
      `}
      onClick={handleClick}
    >
      {image}
      {possibleMoves.moveset.includes(position) && <div style={{backgroundColor: '#777', width: 10, height: 10, borderRadius: 5}}/>}
    </div>
  );
}

export default Square;
