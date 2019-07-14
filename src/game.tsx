import * as React from "react";
import "./index.css";

type State = "x" | "o" | "";

const Cross = "x";
const Circle = "o";
const Null = "";

interface Contents<T> {
  value: T[];
  next: T;
}

function nextContents(current: Contents<State>, next: State[]): Contents<State> {
  let c = current.next;
  if (c === Circle || c === Null) {
    return { value: next, next: Cross };
  } else {
    return { value: next, next: Circle };
  }
}

interface Tile {
  value: State;
  onClick: () => void;
}

class Square extends React.Component<Tile, {}> {
  render() {
    return (
      <button className="square"
          onClick={ this.props.onClick }>
        { this.props.value }
      </button>
    );
  }
}

class Board extends React.Component<{}, Contents<State>> {
  state: Contents<State> = { value: new Array(9).fill(Null), next: Cross };

  handleClick(position: number) {
    let squares = this.state.value.slice();
    if (squares[position] === Null) {
      squares[position] = this.state.next;
      this.setState(nextContents(this.state, squares));
    }
  }

  renderSquare(position: number) {
    return <Square value={ this.state.value[position] } onClick={ () => this.handleClick(position) } />;
  }
  render() {
    let status = "Next player: " + this.state.next;
    return (
      <div>
        <div className="status">{ status }</div>
        <div className="board-row">
          { this.renderSquare(0) }
          { this.renderSquare(1) }
          { this.renderSquare(2) }
        </div>
        <div className="board-row">
          { this.renderSquare(3) }
          { this.renderSquare(4) }
          { this.renderSquare(5) }
        </div>
        <div className="board-row">
          { this.renderSquare(6) }
          { this.renderSquare(7) }
          { this.renderSquare(8) }
        </div>
      </div>
    );
  }
}

export class Game extends React.Component<{}, {}> {
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
        <div className="game-info">
          <div>{ /* status */ }</div>
          <ol>{ /* todo */ }</ol>
        </div>
      </div>
    );
  }
}

