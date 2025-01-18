import CustomIcon from "../../assets/icons";
import { usePlayerContext } from "../../context/mainContext";
import styles from "./reset.module.scss";

function GameButtons() {
  const { reset } = usePlayerContext();
  return (
    <section>
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
      <div className={styles["command-controls"]}>
        <button className={styles["reset__button"]} onClick={reset}>
          <span>Undo</span>
          <CustomIcon icon="Undo" svgProps={{ width: 20 }} />
        </button>
        <button
          onClick={() => alert("Hello There!")}
          className={`${styles["reset__button"]} ${
            false ? styles["disable"] : ""
          }`}>
          <span>Redo</span>
          <CustomIcon icon="Redo" svgProps={{ width: 20 }} />
        </button>
      </div>
    </section>
  );
}

export default GameButtons;
