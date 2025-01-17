import { usePlayerContext } from "../../context/mainContext";
import styles from "./reset.module.scss";

function ResetGame() {
  const { reset } = usePlayerContext();
  return (
    <div className={styles["reset"]}>
      <button className={styles["reset__button"]} onClick={reset}>
        Reset Game
      </button>
      <button
        onClick={() => alert("Hello There!")}
        className={styles["reset__button"]}
        style={{ backgroundColor: "#ffc300" }}>
        Hello Mate!
      </button>
    </div>
  );
}

export default ResetGame;
