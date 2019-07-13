import * as React from "react";
import * as styles from "./index.css";

class Square extends React.Component<{}, {}> {
  render() {
    return (
      <button className={ styles.square }>
        { /* TODO */ }
      </button>
    );
  }
}

class Board extends React.Component<{}, {}> {
  renderSquare(position: number) {
    return <Square />;
  }
  render() {
    let status = "Next player: X";
    return (
      <div>
        <div className={ styles.status }>{ status }</div>
        <div className={ styles["board-row"] }>
          { this.renderSquare(0) }
          { this.renderSquare(1) }
          { this.renderSquare(2) }
        </div>
        <div className={ styles["board-row"] }>
          { this.renderSquare(3) }
          { this.renderSquare(4) }
          { this.renderSquare(5) }
        </div>
        <div className={ styles["board-row"] }>
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
      <div className={ styles.game }>
        <div className="game-board">
          <Board />
        </div>
        <div className={ styles["game-info"] }>
          <div>{ /* status */ }</div>
          <ol>{ /* todo */ }</ol>
        </div>
      </div>
    );
  }
}

