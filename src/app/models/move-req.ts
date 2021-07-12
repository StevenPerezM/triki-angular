export class MoveReq {

  public idGame: string;
  public movementx: number;
  public movementy: number;


  constructor(idGame: string, movementx: number, movementy: number) {
    this.idGame = idGame;
    this.movementx = movementx;
    this.movementy = movementy;
  }
}
