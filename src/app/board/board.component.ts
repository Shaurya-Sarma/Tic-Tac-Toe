import { Component, OnInit } from "@angular/core";
import { Square } from "../square/square";
import { ScoreService } from "../score.service";
import { ScoreSheet } from "../scoresheet/scoreSheet";

@Component({
  selector: "app-board",
  templateUrl: "./board.component.html",
  styleUrls: ["./board.component.scss"]
})
export class BoardComponent implements OnInit {
  squares: Square[];
  playerTurn: boolean;
  winner: string;
  isDraw: boolean;
  playerXwins: number;
  playerOwins: number;
  disable = false;
  possibleWins = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  //* Injecting ScoreService
  constructor(private scoreService: ScoreService) {}

  ngOnInit() {
    //* Intializing the Game
    this.newGame();
    this.playerXwins = 0;
    this.playerOwins = 0;
  }

  newGame() {
    //* Resetting Game
    this.squares = Array(9).fill(null);
    this.playerTurn = true;
    this.winner = null;
    this.isDraw = false;
    this.disable = false;
  }

  get playerMarker() {
    return this.playerTurn ? "X" : "O";
  }

  makeMove(index: number) {
    //* Checks whether square is empty
    if (this.squares[index] === null) {
      //* Replaces empty square with playerMarker
      this.squares.splice(index, 1, { player: this.playerMarker, win: false });
      //* Switches turn
      this.playerTurn = !this.playerTurn;
    }
    //* Check for Winner
    this.winner = this.isWinner();
    if (this.winner === "X") {
      this.playerXwins += 1;
    } else if (this.winner === "O") {
      this.playerOwins += 1;
    }
    //* Check for Tie
    this.isDraw = this.checkTie();
    this.scoreService.publish(
      new ScoreSheet(this.playerXwins, this.playerOwins)
    );
  }

  valueAtSquare(square: Square): string {
    //* Returns playerMarker at specified square
    return square && square.player;
  }

  isWinner(): string {
    //* Iterates through all possible win combinations
    for (let i = 0; i < this.possibleWins.length; i++) {
      //* Selecting the three index combination
      const [a, b, c] = this.possibleWins[i];
      if (
        //* Checking if all three squares have same playerMarker
        this.squares[a] &&
        this.squares[a].player === this.valueAtSquare(this.squares[b]) &&
        this.squares[a].player === this.valueAtSquare(this.squares[c])
      ) {
        //* Player has Won
        this.disable = true;
        this.squares[a] = { ...this.squares[a], win: true };
        this.squares[b] = { ...this.squares[b], win: true };
        this.squares[c] = { ...this.squares[c], win: true };
        return this.squares[a].player;
      }
    }
    //* No Player has Won
    return null;
  }

  checkTie() {
    if (
      this.winner === null &&
      //* Checks whether all squares are filled
      this.squares.every(square => {
        return (
          this.valueAtSquare(square) === "X" ||
          this.valueAtSquare(square) === "O"
        );
      })
    ) {
      return true;
    }
  }
}
