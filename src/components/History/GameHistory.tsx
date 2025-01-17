import { usePlayerContext } from "../../context/mainContext";
import { findChosen } from "../../utils/findChosen";
import styles from "./history.module.scss";

function GameHistory() {
  const { selected, handleChosenPrev } = usePlayerContext();
  return (
    <section className={styles["parent"]}>
      <h2>Game History</h2>
      {selected.length > 0 && (
        <div className={styles["history"]}>
          {selected.map((choice, index) => (
            <div
              key={index}
              className={styles["history__choice"]}
              onClick={() => {
                handleChosenPrev(choice);
              }}>
              <div className={styles["history__choice-infos"]}>
                <span>Player: {choice.player === "one" ? "X" : "O"}</span>
                <span>{findChosen(choice.index)}</span>
              </div>
              {index < selected.length - 1 && <hr />}
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

export default GameHistory;
