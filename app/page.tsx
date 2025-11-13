'use client';

import Board from "./components/board/Board";
import { useGame } from "./hooks/zuntand/useGame";

export default function Page() {
  const passTurn = useGame((state) => state.passTurn);
  const turn = useGame((state) => state.turn);
  return (
    <>
      <div className="boardHead">
        <div>
          <p>Current turn:</p>
          <img src={`/assets/pieces/${turn}/king.svg`}/>
          <button onClick={passTurn}>pass turn</button>
        </div>
      </div>
      <Board />
    </>
  );
}