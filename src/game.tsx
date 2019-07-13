import * as React from "react";
import "./index.css";

interface Tile {
  position: number;
}

class Square extends React.Component<Tile, {}> {
  render() {
    return (
      <button className="square">{ this.props.position }</button>
    );
  }
}

class Board extends React.Component<{}, {}> {
  renderSquare(position: number) {
    return <Square position={ position } />;
  }
  render() {
    let status = "Next player: X";
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

