'use client';

import { BoardPosition, Color } from '@/app/src/types/types';
import { useGame } from '../../../hooks/zustand/useGame';
import styles from './styles.module.css';
import PieceImage from '../piece/Piece';
import { useCallback, useMemo } from 'react';
import { getColIndex, getRowIndex } from '@/app/src/utils/utils';

interface SquareProps {
  color: Color;
  position: BoardPosition;
}

function Square({ position, color }: SquareProps) {
  const clickedPiecePosition = useGame(
    (state) => state.clickedPiecePosition
  );
  const showSquarePosition = useGame(
    (state) => state.showSquarePosition
  );
  const turn = useGame((state) => state.turn);
  const board = useGame((state) => state.board);
  const checkPosition = useGame(
    (state) => state.forbiddenKingPosition.checkPosition
  );
  const possibleMoves = useGame((state) => state.possibleMoves);
  const setClickedPiece = useGame((state) => state.setClickedPiece);
  const movePiece = useGame((state) => state.movePiece);

  const piece = board.getPieceByPosition(position);

  const isAllyPiece = useMemo(
    () =>
      piece &&
      piece.color === turn &&
      clickedPiecePosition !== position,
    [piece, turn, clickedPiecePosition, position]
  );

  const destination = useMemo(
    () => possibleMoves.get(position) === position,
    [possibleMoves, position]
  );

  const handleClick = useCallback(() => {
    if (destination) return movePiece(position);
    if (isAllyPiece) setClickedPiece(position);
  }, [
    destination,
    movePiece,
    position,
    isAllyPiece,
    setClickedPiece,
  ]);

  const isTarget = useMemo(() => {
    return checkPosition === position || (destination && piece);
  }, [checkPosition, destination, piece, position]);

  const collumnLabel =
    showSquarePosition && getRowIndex(position) === 7
      ? position[0]
      : '';
  const rowLabel =
    showSquarePosition && getColIndex(position) === 0
      ? position[1]
      : '';

  return (
    <div
      className={`
      ${styles.square} ${styles[color]}
      ${clickedPiecePosition == position ? styles.clicked : styles.notClicked}
      ${isAllyPiece && styles.allyPiece}
      ${isTarget && styles.checked}
      `}
      onClick={handleClick}
    >
      <PieceImage piece={piece} />
      {destination && !piece && (
        <div className={styles.destination} />
      )}
      {collumnLabel && (
        <span className={styles.collumnLabel}>{collumnLabel}</span>
      )}
      {rowLabel && (
        <span className={styles.rowLabel}>{rowLabel}</span>
      )}
    </div>
  );
}

export default Square;
