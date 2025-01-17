import CustomIcon from "../assets/icons";
import styles from "../styles/index.module.scss";

function Players() {
  return (
    <div className={styles["players"]}>
      <div className={styles["players__item"]}>
        <CustomIcon icon="Cross" svgProps={{ width: 50 }} />
        <p>Player One</p>
      </div>
      <div className={styles["players__item"]}>
        <CustomIcon icon="O" svgProps={{ width: 55 }} />
        <p>Player Two</p>
      </div>
    </div>
  );
}

export default Players;
