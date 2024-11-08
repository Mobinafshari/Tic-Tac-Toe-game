import useGameStatus from "../hooks/useGameStatus";
import styles from "../styles/index.module.scss";
import Square from "./Square";


function Dooz() {
  const { gameOver } = useGameStatus();

  return (
    <div className={styles["dooz"]}>
      {Array.from({ length: 9 }).map((_, i) => (
        <Square key={i} index={i} gameOver={gameOver} />
      ))}
    </div>
  );
}

export default Dooz;
