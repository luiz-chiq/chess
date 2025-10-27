import "./App.css";
import Board from "./components/board/Board";
import Square from "./components/board/Square";
import { useBoard } from "./hooks/zuntand/useBoard";

function App() {
  const passTurn = useBoard((state) => state.passTurn);
  const changePlayer = useBoard((state) => state.changePlayer);
  const turn = useBoard((state) => state.turn);
  const player = useBoard((state) => state.player);
  return (
    <>
      <div className="boardHead">
        <div>
          <p>Current turn:</p>
          <Square color={turn} nonInteractive />
          <button onClick={passTurn}>pass turn</button>
        </div>
        <div>
          <p>Current player:</p>
          <Square color={player} nonInteractive />
          <button onClick={changePlayer}>change player</button>
        </div>
      </div>
      <Board />
    </>
  );
}

export default App;
