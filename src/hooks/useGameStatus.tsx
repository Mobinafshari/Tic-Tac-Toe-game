import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { doesPlayerWin } from "../utils/doesPlayerWin";
import { usePlayerContext } from "../context/mainContext";
import styles from "../styles/index.module.scss"

function useGameStatus() {
  const { getPlayerSelectedIndices, reset } = usePlayerContext();
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    const checkWin = (player: "one" | "two") => {
      const selectedIndices = getPlayerSelectedIndices(player).sort();
      if (doesPlayerWin(selectedIndices)) {
        setGameOver(true);
        toast.success(`Player ${player} wins!`);
        toast((t) => (
          <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
            <span>Restart the game?</span>
            <button
            className={styles["reset-button"]}
              onClick={() => {
                toast.dismiss(t.id);
                reset();
                setGameOver(false);
              }}>
              Reset
            </button>
          </div>
        ));
      }
    };

    checkWin("one");
    checkWin("two");
  }, [getPlayerSelectedIndices, reset]);

  return { gameOver };
}

export default useGameStatus;
