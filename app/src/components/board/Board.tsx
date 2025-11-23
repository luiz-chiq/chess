'use client';

import Square from "./square/Square";
import { useGame } from "@/app/src/hooks/zustand/useGame";
import styles from "./styles.module.css";

function Board() {
  const board = useGame((state) => state.board);

  return (
    <div className={styles.boardContainer}>
      <div className={styles.board}>
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
