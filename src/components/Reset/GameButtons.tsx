import CustomIcon from "../../assets/icons";
import { usePlayerContext } from "../../context/mainContext";
import styles from "./reset.module.scss";

function GameButtons() {
  const { reset, canRedo, canUndo, redo, undo } = usePlayerContext();
  return (
    <section className={styles["buttons-parent"]}>
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
        <button
          className={`${styles["reset__button"]} ${
            !canUndo ? styles["disable"] : ""
          }`}
          onClick={undo}>
          <span>Undo</span>
          <CustomIcon
            icon="Undo"
            svgProps={{ width: 20, fill: canUndo ? "" : "white" }}
          />
        </button>
        <button
          onClick={redo}
          className={`${styles["reset__button"]} ${
            !canRedo ? styles["disable"] : ""
          }`}>
          <span>Redo</span>
          <CustomIcon
            icon="Redo"
            svgProps={{ width: 20, fill: canRedo ? "" : "white" }}
          />
        </button>
      </div>
    </section>
  );
}

export default GameButtons;
