import "../../App.css";
import { useBoard } from "../../hooks/zuntand/useBoard";
import { type BoardPosition, type Color, type Piece } from "../../types/types";

interface SquareProps {
  color: Color;
  position?: BoardPosition;
  piece?: Piece;
  nonInteractive?: boolean;
}

function Square({ position, color, piece, nonInteractive }: SquareProps) {
  const clickedSquare = useBoard((state) => state.clickedSquare);
  const playerColor = useBoard((state) => state.player);
  const turn = useBoard((state) => state.turn);

  const setClickedSquare = useBoard((state) => state.setClickedSquare);

  const handleClick = () => {
    if (!position) return;
    if (nonInteractive) return;
    if (playerColor !== piece!.color) return;
    if (playerColor !== turn) return;
    setClickedSquare(position);
  };

  const getImage = () => {
    if (!piece) return null;
    return `/assets/pieces/${piece.color}/${piece.type}.svg`;
  };

  return (
    <div
      className={`square ${color} ${
        clickedSquare == position && !nonInteractive ? "clicked" : "notClicked"
      }${nonInteractive ? " nonInteractive" : ""}`}
      onClick={handleClick}
    >
      {getImage() && (
        <img src={getImage()!} alt={`${piece?.color} ${piece?.type}`} />
      )}
    </div>
  );
}

export default Square;
