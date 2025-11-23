'use client';

import { useGame } from "./src/hooks/zustand/useGame";
import styles from "./page.module.css";
import { useRouter } from "next/navigation";
import Board from "./src/components/board/Board";
import { useUser } from "./src/hooks/zustand/useUser";
import { useEffect } from "react";


export default function Page() {
  const router = useRouter();
  const passTurn = useGame((state) => state.passTurn);
  const toggleShowSquarePosition = useGame((state) => state.toggleShowSquarePosition);
  const showSquarePosition = useGame((state) => state.showSquarePosition);
  const turn = useGame((state) => state.turn);
  const token = useUser((state) => state.token);

  useEffect(() => {
    if (!token) {
      router.replace('/login');
    }
  }, [token, router]);

  if (!token) {
    return null;
  }

  return (
    <>
      <button onClick={() => router.replace('/login') }>Logout</button>
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
      <div className={styles.boardWrapper}>
      <Board />
      </div>
    </>
  );
}