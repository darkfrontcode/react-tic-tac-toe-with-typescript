import * as React from 'react';
import { Point } from './point';
import { Square } from './square';

interface IBoardProps {
  squares: Point[];
  onClick: (i: number) => void;
}

export class Board extends React.Component<IBoardProps, {}> {

  public render(): JSX.Element {

    return (
      <div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }

  private renderSquare(i: number): JSX.Element {

    const { squares, onClick } = this.props;

    return <Square
      value={squares[i]}
      onClick={() => onClick(i)}
    />;
  }

}
