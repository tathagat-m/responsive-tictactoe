import App from "./App";
import { render, screen } from "@testing-library/react";

describe("App Tests", () => {
  test("renders without crashing", () => {
    render(<App />);
  });

  test("renders TicTacToe component", () => {
    render(<App />);
    const linkElement = screen.getByText(/Tic Tac Toe/i);
    expect(linkElement).toBeInTheDocument();
  });
});
