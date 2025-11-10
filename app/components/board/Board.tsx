'use client';

import { useMemo } from "react";
import "../../App.css";
import { useBoard } from "../../hooks/zuntand/useBoard";
import Square from "./Square";
function Board() {
  const board = useBoard((state) => state.board);
  console.log("Board render");

  return (
    <div className="boardContainer">
      <div className="board">
        {Object.values(board!).map((square) => (
        <Square
          key={square.position}
          position={square.position}
          color={square.color}
          />
        ))}
      </div>
    </div>
  );
}

export default Board;
