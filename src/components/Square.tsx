import { useEffect, useState } from "react";
import styles from "../styles/index.module.scss";
import { usePlayerContext } from "../context/mainContext";
import Icon from "./Icon";

type Props = {
  index: number;
  gameOver : boolean;
};
function Square({ index, gameOver }: Props) {
  const [isClicked, setIsClicked] = useState(false);
  const { handleSelect, player, selected , reseted} = usePlayerContext();
  useEffect(() => {
    setIsClicked(false)
  } , [reseted])
  const findSelected = () =>
    selected.find((ele) => ele.index === index)?.player ?? player;
  const LocalPLayer = findSelected();
  useEffect(() => {
    if(gameOver &&  reseted) setIsClicked(false)
  } , [reseted , gameOver])
  return (
    <div
      style={{ cursor: gameOver ? "not-allowed" : "pointer" }}
      className={styles["square"]}
      onClick={() => {
        if (isClicked) return;
        setIsClicked(true);
        handleSelect({ index, player });
      }}>
      <span className={styles["square__icon"]}>
        {isClicked && <Icon player={LocalPLayer} />}
      </span>
    </div>
  );
}

export default Square;
