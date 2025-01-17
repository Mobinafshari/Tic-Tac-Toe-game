import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { doesPlayerWin } from "../utils/doesPlayerWin";
import { usePlayerContext } from "../context/mainContext";
import styles from "../styles/index.module.scss";

function useGameStatus() {
  const { getPlayerSelectedIndexes, reset, reseted } = usePlayerContext();
  const [gameOver, setGameOver] = useState(false);
  useEffect(() => {
    setGameOver(false);
  }, [reseted]);
  useEffect(() => {
    const checkWin = (player: "one" | "two") => {
      const selectedIndices = getPlayerSelectedIndexes(player).sort();
      if (doesPlayerWin(selectedIndices)) {
        setGameOver(true);
        toast.success(`Player ${player} wins!`, { className: styles.toast });
        toast((t) => (
          <div className={styles["toast"]}>
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
  }, [getPlayerSelectedIndexes, reset]);

  return { gameOver };
}

export default useGameStatus;
