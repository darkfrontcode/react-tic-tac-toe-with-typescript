import * as React from 'react';
import { Point } from './point';

export interface ISquareProps {
  value: Point;
  onClick(): void;
}

export function Square(props: ISquareProps): JSX.Element {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
}
