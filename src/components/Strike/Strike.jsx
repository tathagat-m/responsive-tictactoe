import styles from "./Strike.module.css";

const Strike = ({ strikeClass }) => {
  return <div className={`${styles.strike} ${styles[strikeClass]}`}></div>;
};

export default Strike;
