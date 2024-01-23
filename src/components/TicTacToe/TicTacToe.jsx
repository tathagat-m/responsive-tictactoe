import React, { useState, useEffect } from "react";
import styles from "./TicTacToe.module.css";
import Tile from "../Tile/Tile";
import {
  gameStatus,
  playerO,
  playerX,
  winningCombinations,
} from "../../constants/GameConstant";
import Strike from "../Strike/Strike";
import clickSoundAsset from "../../assets/click.wav";
import gameOverSoundAsset from "../../assets/gameOver.wav";

const clickSound = new Audio(clickSoundAsset);
clickSound.volume = 0.5;

const gameOverSound = new Audio(gameOverSoundAsset);
gameOverSound.volume = 0.8;

export const checkIfWin = (tiles, setStatus, setStrikeClass) => {
  let drawFlag = true;
  winningCombinations.forEach(({ combo, strikeClass }) => {
    const [a, b, c] = combo;
    if (tiles[a] && tiles[a] === tiles[b] && tiles[a] === tiles[c]) {
      setStrikeClass(strikeClass);
      if (tiles[a] === playerX) {
        setStatus(gameStatus.playerXWins);
      } else {
        setStatus(gameStatus.playerOWins);
      }
      drawFlag = false;
    }
  });

  const areAllTilesFilledIn = tiles.every((tile) => tile !== null);
  if (areAllTilesFilledIn && drawFlag) {
    setStatus(gameStatus.draw);
  }
};

const TicTacToe = () => {
  const storedGameData = localStorage.getItem("tictactoe-game");
  const storedChangeData = localStorage.getItem("tictactoe-change");

  const [changes, setChanges] = useState(
    storedChangeData ? JSON.parse(storedChangeData) : []
  );
  const [tiles, setTiles] = useState(
    storedGameData ? JSON.parse(storedGameData) : Array(9).fill(null)
  );
  const [currentPlayer, setCurrentPlayer] = useState(playerX);
  const [status, setStatus] = useState(gameStatus.inProgress);
  const [strikeClass, setStrikeClass] = useState();

  const handleTileClick = (index) => {
    //if tile is already filled, do nothing
    if (tiles[index] !== null) return;

    //if game is not in progress, do nothing
    if (status !== gameStatus.inProgress) return;

    const newTiles = [...tiles];
    newTiles[index] = currentPlayer;
    setTiles(newTiles);
    setChanges([...changes, index]);
    setCurrentPlayer(currentPlayer === playerX ? playerO : playerX);

    //Update local storage
    localStorage.setItem("tictactoe-game", JSON.stringify(newTiles));
    localStorage.setItem(
      "tictactoe-change",
      JSON.stringify([...changes, index])
    );
  };

  const handleReset = () => {
    setTiles(Array(9).fill(null));
    setChanges([]);
    setCurrentPlayer(playerX);
    setStatus(gameStatus.inProgress);
    setStrikeClass();

    //clear local storage
    localStorage.removeItem("tictactoe-game");
    localStorage.removeItem("tictactoe-change");
  };

  const handleUndo = () => {
    const newTiles = [...tiles];
    newTiles[changes[changes.length - 1]] = null;
    setTiles(newTiles);
    setChanges(changes.slice(0, -1));
    setCurrentPlayer(currentPlayer === playerX ? playerO : playerX);
  };

  useEffect(() => {
    if (tiles.some((tile) => tile !== null)) {
      clickSound.play();
    }

    checkIfWin(tiles, setStatus, setStrikeClass);
  }, [tiles]);

  useEffect(() => {
    if (status !== gameStatus.inProgress) {
      gameOverSound.play();
    }
  }, [status]);

  return (
    <div className={styles.tictactoeContainer}>
      <h2>Tic Tac Toe</h2>
      <div className={styles.board}>
        {tiles.map((tile, index) => (
          <Tile
            key={index}
            value={tile}
            index={index}
            onTileClick={() => handleTileClick(index)}
          />
        ))}
        {status !== gameStatus.inProgress && status !== gameStatus.draw && (
          <Strike strikeClass={strikeClass} />
        )}
      </div>
      <h3>
        {status === gameStatus.inProgress
          ? `Current Player: Player ${currentPlayer}`
          : `${status}`}
      </h3>
      <div className={styles.actions}>
        <button
          data-testid="reset-button"
          className={styles.actionBtn}
          onClick={handleReset}
        >
          Reset
        </button>
        {status === gameStatus.inProgress && changes.length > 0 && (
          <button
            data-testid="undo-button"
            className={styles.actionBtn}
            onClick={handleUndo}
          >
            Undo
          </button>
        )}
      </div>
    </div>
  );
};

export default TicTacToe;
