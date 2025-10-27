import "../../App.css";
import { useBoard } from "../../hooks/zuntand/useBoard";
import Square from "./Square";
function Board() {
  const board = useBoard((state) => state.board);
  return (
    <div className="board">
      {Object.values(board!).map((square) => (
        <Square
          position={square.position}
          color={square.color}
          piece={square.piece || undefined}
        />
      ))}
    </div>
  );
}

export default Board;
