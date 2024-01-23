import styles from "./Tile.module.css";
import Cross from "../../assets/cross.png";
import Circle from "../../assets/circle.png";
import { playerO, playerX } from "../../constants/GameConstant";

const Tile = ({ value, index, onTileClick }) => {
  return (
    <div
      data-testid={`tile-${index + 1}`}
      className={styles.tile}
      onClick={onTileClick}
    >
      {value === playerX && (
        <img
          data-testid={`tile-img-${index + 1}`}
          className={styles.tileImg}
          src={Cross}
          alt="cross"
        />
      )}
      {value === playerO && (
        <img
          data-testid={`tile-img-${index + 1}`}
          className={styles.tileImg}
          src={Circle}
          alt="circle"
        />
      )}
    </div>
  );
};

export default Tile;
