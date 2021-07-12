import {User} from "./user";

export class GameReq{

  public player1: User;
  public player2: User;

  constructor(player1: User, player2: User) {
    this.player1 = player1;
    this.player2 = player2;
  }
}
