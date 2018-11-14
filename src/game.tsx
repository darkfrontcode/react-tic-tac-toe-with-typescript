import * as React from 'react';
import { Board } from './board';
import { calculateWinner } from './calculate-winner';
import { Point } from './point';

export interface IGameHistory {
  squares: Point[];
}

export interface IGameState {
  history: IGameHistory[];
  stepNumber: number;
  xIsNext: boolean;
}

export class Game extends React.Component<{}, IGameState> {

  public state = {
    history: [{
      squares: Array(9).fill(null)
    }],
    stepNumber: 0,
    xIsNext: true
  }

  public render(): JSX.Element {

    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);

    const moves = history.map((step: IGameHistory, move: number) => {
      const desc = move ? `Go to move #${move}` : 'Go to game start';
      return (
        <li key={move}>
          <button onClick={() => this.jumpTo(move)}>{desc}</button>
        </li>
      )
    });

    const status = winner ? `Winner: ${winner}` : `Next player: ${this.currentTurn}`;

    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares}
            onClick={(i) => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }

  private handleClick(i: number): void {

    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();

    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.currentTurn;
    this.setState({
      history: history.concat([{ squares }]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext
    });
  }

  private jumpTo(step: number) {
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0,
    });
  }

  private get currentTurn(): Point {
    return this.state.xIsNext ? 'X' : 'O';
  }

}
