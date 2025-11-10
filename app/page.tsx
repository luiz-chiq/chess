'use client';

import Board from "./components/board/Board";
import Square from "./components/board/Square";
import { useBoard } from "./hooks/zuntand/useBoard";
import { PieceType } from "./types/types";

export default function Page() {
  const passTurn = useBoard((state) => state.passTurn);
  const changePlayer = useBoard((state) => state.changePlayer);
  const turn = useBoard((state) => state.turn);
  const player = useBoard((state) => state.player);
  return (
    <>
      <div className="boardHead">
        <div>
          <p>Current turn:</p>
          <img src={`/assets/pieces/${turn}/king.svg`}/>
          {/* <button onClick={passTurn}>pass turn</button> */}
        </div>
        {/* <div>
          <p>You:</p>
          <img src={`/assets/pieces/${player}/king.svg`}/>
          <button onClick={changePlayer}>change player</button>
        </div> */}
      </div>
      <Board />
    </>
  );
}