import { gameStatus } from "../../constants/GameConstant";
import { checkIfWin } from "./TicTacToe";
import React from "react";
import { render, fireEvent } from "@testing-library/react";
import TicTacToe from "./TicTacToe";

describe("TicTacToe Component", () => {
  test("renders without crashing", () => {
    render(<TicTacToe />);
  });

  test("handles tile click correctly", () => {
    //Arrange
    const { getByTestId } = render(<TicTacToe />);
    const tile = getByTestId("tile-1");

    //Act
    fireEvent.click(tile);

    //Assert
    const imgElement = getByTestId("tile-img-1");

    expect(imgElement).toHaveAttribute("alt", "cross");
    expect(tile).toContainElement(imgElement);
  });

  test("handles multiple tile clicks", () => {
    //Arrange
    const { getByTestId } = render(<TicTacToe />);
    const tile = getByTestId("tile-1");

    //Act
    fireEvent.click(tile);

    //Assert
    const imgElement = getByTestId("tile-img-1");

    expect(imgElement).toHaveAttribute("alt", "cross");
    expect(tile).toContainElement(imgElement);

    //Act
    fireEvent.click(tile);

    //Assert
    expect(tile).toContainElement(imgElement);
  });

  test("disable tile click after game is over", () => {
    //Arrange
    const { getByTestId } = render(<TicTacToe />);
    const tile1 = getByTestId("tile-1");
    const tile2 = getByTestId("tile-2");
    const tile3 = getByTestId("tile-3");
    const tile4 = getByTestId("tile-4");
    const tile5 = getByTestId("tile-5");
    const tile6 = getByTestId("tile-6");

    //Act
    fireEvent.click(tile1);
    fireEvent.click(tile5);
    fireEvent.click(tile2);
    fireEvent.click(tile4);
    fireEvent.click(tile3);
    fireEvent.click(tile6);

    //Assert
    expect(tile6).toHaveTextContent("");
  });

  test("resets the game correctly", () => {
    //Arrange
    const { getByTestId } = render(<TicTacToe />);
    const resetButton = getByTestId("reset-button");

    //Act
    fireEvent.click(resetButton);

    //Assert
    const tile1 = getByTestId("tile-1");
    const tile3 = getByTestId("tile-3");
    const tile5 = getByTestId("tile-5");
    const tile7 = getByTestId("tile-7");
    const tile9 = getByTestId("tile-9");

    expect(tile1).toHaveTextContent("");
    expect(tile3).toHaveTextContent("");
    expect(tile5).toHaveTextContent("");
    expect(tile7).toHaveTextContent("");
    expect(tile9).toHaveTextContent("");
  });

  test("undoes the last move correctly", () => {
    //Arrange
    const { getByTestId } = render(<TicTacToe />);
    const tile1 = getByTestId("tile-1");
    const tile2 = getByTestId("tile-2");

    //Act
    fireEvent.click(tile1);
    fireEvent.click(tile2);

    const undoButton = getByTestId("undo-button");
    const tileImg1 = getByTestId("tile-img-1");

    fireEvent.click(undoButton);

    //Assert
    expect(tile1).toContainElement(tileImg1);
    expect(tile2).toHaveTextContent("");
  });

  test("provides feedback when game is in progress", () => {
    const { getByText } = render(<TicTacToe />);
    const currentPlayerMessage = getByText(/Current Player:/i);

    //Assert
    expect(currentPlayerMessage).toHaveTextContent("Current Player: Player X");
  });

  test("provides feedback when the game is over", () => {
    const { getByTestId, getByText } = render(<TicTacToe />);
    const tile1 = getByTestId("tile-1");
    const tile2 = getByTestId("tile-2");
    const tile3 = getByTestId("tile-3");
    const tile4 = getByTestId("tile-4");
    const tile5 = getByTestId("tile-5");

    //Act
    fireEvent.click(tile1);
    fireEvent.click(tile5);
    fireEvent.click(tile2);
    fireEvent.click(tile4);
    fireEvent.click(tile3);

    //Assert
    const gameMsg = getByText(/Player X Wins!/i);
    expect(gameMsg).toBeInTheDocument();
  });
});

describe("checkIfWin function", () => {
  test("it sets player X wins status and strike class for winning combination", () => {
    // Arrange
    const tiles = ["X", "O", "O", null, "X", null, null, null, "X"];
    const setStatus = jest.fn();
    const setStrikeClass = jest.fn();

    // Act
    checkIfWin(tiles, setStatus, setStrikeClass);

    // Assert
    expect(setStatus).toHaveBeenCalledWith(gameStatus.playerXWins);
    expect(setStrikeClass).toHaveBeenCalledWith("strike-diagonal-1");
  });

  test("it sets player O wins status and strike class for winning combination", () => {
    // Arrange
    const tiles = [null, "X", "X", "X", "O", "X", "O", "O", "O"];
    const setStatus = jest.fn();
    const setStrikeClass = jest.fn();

    // Act
    checkIfWin(tiles, setStatus, setStrikeClass);

    // Assert
    expect(setStatus).toHaveBeenCalledWith(gameStatus.playerOWins);
    expect(setStrikeClass).toHaveBeenCalledWith("strike-row-3");
  });

  test("it sets draw status when all tiles are filled in and no winning combination", () => {
    // Arrange
    const tiles = ["X", "O", "O", "O", "X", "X", "X", "X", "O"];
    const setStatus = jest.fn();
    const setStrikeClass = jest.fn();

    // Act
    checkIfWin(tiles, setStatus, setStrikeClass);

    // Assert
    expect(setStatus).toHaveBeenCalledWith(gameStatus.draw);
  });
});
