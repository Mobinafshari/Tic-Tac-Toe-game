import styles from "../styles/index.module.scss";
import { usePlayerContext } from "../context/mainContext";
import Icon from "./Icon";

type Props = {
  index: number;
  gameOver: boolean;
};
function Square({ index, gameOver }: Props) {
  const { handleSelect, player, selected } = usePlayerContext();
  const isSelected = selected.find((select) => select.index === index);

  const findSelected = () =>
    selected.find((ele) => ele.index === index)?.player ?? player;

  const LocalPLayer = findSelected();

  return (
    <div
      style={{ cursor: gameOver ? "not-allowed" : "pointer" }}
      className={styles["square"]}
      onClick={() => {
        if (isSelected || gameOver) return;
        handleSelect({ index, player });
      }}>
      <span className={styles["square__icon"]}>
        {isSelected && <Icon player={LocalPLayer} />}
      </span>
    </div>
  );
}

export default Square;
