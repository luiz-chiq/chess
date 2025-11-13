'use client';

import Board from "./components/board/Board";
import { useGame } from "./hooks/zuntand/useGame";

export default function Page() {
  const passTurn = useGame((state) => state.passTurn);
  const toggleShowSquarePosition = useGame((state) => state.toggleShowSquarePosition);
  const showSquarePosition = useGame((state) => state.showSquarePosition);
  const turn = useGame((state) => state.turn);
  return (
    <>
      <div className="boardHead">
        <div>
          <p>Current turn:</p>
          <img src={`/assets/pieces/${turn}/king.svg`}/>
          <button onClick={passTurn}>Pass turn</button>
        </div>
        <div>
          <p>Show position:</p>
          <button onClick={toggleShowSquarePosition}>{showSquarePosition ? "Deactivate" : "Activate"}</button>

        </div>
      </div>
      <Board />
    </>
  );
}