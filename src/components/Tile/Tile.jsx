import styles from "./Tile.module.css";
import Cross from "../../assets/cross.png";
import Circle from "../../assets/circle.png";
import { playerO, playerX } from "../../constants/GameConstant";

const Tile = ({ value, onTileClick }) => {
  return (
    <div className={styles.tile} onClick={onTileClick}>
      {value === playerX && (
        <img className={styles.tileImg} src={Cross} alt="cross" />
      )}
      {value === playerO && (
        <img className={styles.tileImg} src={Circle} alt="circle" />
      )}
    </div>
  );
};

export default Tile;
