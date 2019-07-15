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

interface IndexAccess {
  index: number;
}

interface Histories {
  entries: History[];
  next: State;
  step: number;
}

class HistoryItem extends React.Component<IndexAccess & Actionable, {}> {
  render() {
    const desc = this.props.index === 0?
      "Go to game start":
      "Go to move #" + (this.props.index + 1);
    return (
      <li >
        <button onClick={ () => this.props.onClick(this.props.index) }>
          { desc }
        </button>
      </li>
    );
  }
}

export class Game extends React.Component<{}, Histories> {
  state: Histories = {
    entries: [{ contents: new Array(9).fill(Null) }],
    next: Cross,
    step: 0
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

  stateOfCurrentStep(): State[] {
    const histories = this.state.entries;
    const cur = histories[this.state.step];
    return cur.contents;
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
    if (this.hasWinner() || this.state.entries.length !== (this.state.step + 1)) {
      return;
    }
    const cur = this.current();
    const squares = cur.slice();
    squares[position] = this.state.next;
    this.setState({
      entries: this.state.entries.concat({ contents: squares }),
      next: this.next(),
      step: this.state.step + 1
    });
  }

  jumpTo(step: number) {
    this.setState({
     next: (step % 2) === 0? Cross: Circle,
     step: step
    });
  }

  render() {
    let finished = this.hasWinner();
    let status = finished?
        "Winner: " + winner(this.current()):
        "Next player: " + this.state.next;

    const moves = this.state.entries.map((his, index) => {
      return (<HistoryItem key={ index } index={ index } onClick={ (pos: number) => this.jumpTo(pos) } />);
    });

    return (
      <div className="game">
        <div className="game-board">
          <Board
              contents={ this.stateOfCurrentStep() }
              onClick={ (pos: number) => this.handleClick(pos) } />
        </div>
        <div className="game-info">
          <div>{ status }</div>
          <ol>{ moves }</ol>
        </div>
      </div>
    );
  }
}

