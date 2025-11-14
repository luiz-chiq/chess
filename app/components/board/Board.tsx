'use client';

import { useMemo } from "react";
import "../../App.css";
import Square from "./Square";
import { useGame } from "@/app/hooks/zuntand/useGame";
function Board() {
  const board = useGame((state) => state.board);

  return (
    <div className="boardContainer">
      <div className="board">
        {board.getBoard().reverse().map((row) => 
          row.map((square) => {
            
            return <Square
            key={square.position}
            position={square.position}
            color={square.color}
            />
          })
        )}
      </div>
    </div>
  );
}

export default Board;
