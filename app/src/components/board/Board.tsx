'use client';

import "../../../App.css";
import Square from "./square/Square";
import { useGame } from "@/app/src/hooks/zustand/useGame";
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
