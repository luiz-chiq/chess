'use client';

import { useMemo } from "react";
import styles from "./styles.module.css";
import { Piece } from "@/app/src/types/types";

interface Props {
  piece: Piece | null;
}

export default function PieceImage({ piece }: Props) {
  return useMemo(() =>
    piece &&
        <img 
          className={styles.piece}
          src={`/assets/pieces/${piece.color}/${piece.type}.svg`}
          alt={`${piece.color} ${piece.type}`} 
        />
    , [piece]);
}
