export class Player {

  public id: string;
  public namePlayer: string;
  public firstMovement: boolean;
  public indicator: string;
  public movements: string[];


  constructor(id: string, namePlayer: string, firstMovement: boolean, indicator: string, movements: string[]) {
    this.id = id;
    this.namePlayer = namePlayer;
    this.firstMovement = firstMovement;
    this.indicator = indicator;
    this.movements = movements;
  }

}
