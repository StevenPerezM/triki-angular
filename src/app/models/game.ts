import {Player} from "./player";
import {GameState} from "../enums/game-state"

export class Game {
  public id: string;
  public startDate: Date;
  public turn: string;
  public status: GameState;
  public player1: Player;
  public player2: Player;
  public dataCurrentMovements: string[][];
  public winner: string;

  constructor(id: string, startDate: Date, turn: string, status: GameState, player1: Player, player2: Player, dataCurrentMovements: string[][], winner: string) {
    this.id = id;
    this.startDate = startDate;
    this.turn = turn;
    this.status = status;
    this.player1 = player1;
    this.player2 = player2;
    this.dataCurrentMovements = dataCurrentMovements;
    this.winner = winner;
  }
}
