import * as React from "react";
import "./index.css";

type State = "x" | "o" | "";

const Cross = "x";
const Circle = "o";
const Null = "";

interface History {
  contents: State[];
}

interface Actionable {
  onClick: (position: number) => void;
}

function winner(states: State[]): State {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  const v = states;
  for (let line of lines) {
    const [x, y, z] = line
    if (v[x] !== Null && v[x] === v[y] && v[x] === v[z]) {
      return v[x];
    }
  }
  return Null;
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

class Board extends React.Component<History & Actionable, {}> {
  renderSquare(position: number) {
    return <Square value={ this.props.contents[position] } onClick={ () => this.props.onClick(position) } />;
  }

  render() {
    return (
      <div>
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

interface Histories {
  entries: History[];
  next: State;
}

export class Game extends React.Component<{}, Histories> {
  state: Histories = {
    entries: [{ contents: new Array(9).fill(Null) }],
    next: Cross
  };

  hasWinner(): boolean {
    const win: State = winner(this.current());
    return win !== Null;
  }

  current(): State[] {
    const histories = this.state.entries;
    const current = histories[histories.length - 1];
    return current.contents;
  }

  next(): State {
    const cur = this.state.next;
    if (cur === Cross) {
      return Circle;
    } else {
      return Cross;
    }
  }

  handleClick(position: number) {
    if (this.hasWinner()) {
      return;
    }
    const cur = this.current();
    const squares = cur.slice();
    squares[position] = this.state.next;
    this.setState({
      entries: this.state.entries.concat({ contents: squares }),
      next: this.next()
    });
  }

  render() {
    let finished = this.hasWinner();
    let status = finished?
        "Winner: " + winner(this.current()):
        "Next player: " + this.state.next;

    return (
      <div className="game">
        <div className="game-board">
          <Board
              contents={ this.current() }
              onClick={ (pos: number) => this.handleClick(pos) } />
        </div>
        <div className="game-info">
          <div>{ status }</div>
          <ol>{ /* todo */ }</ol>
        </div>
      </div>
    );
  }
}

