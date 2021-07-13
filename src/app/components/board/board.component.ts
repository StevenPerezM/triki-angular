import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import {GameService} from "../../services/game.service";
import {finalize} from "rxjs/operators";
import {Game} from "../../models/game";
import {MoveReq} from "../../models/move-req";
import Swal from "sweetalert2";
import {GameReq} from "../../models/game-req";
import {User} from "../../models/user";
import {NgxSpinnerService} from "ngx-spinner";
import {GameState} from "../../enums/game-state";

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {

  public board: string[];
  private id: string;
  public game: Game | null;

  constructor(private router: Router, private route: ActivatedRoute,
              private serviceGame: GameService, private spinner: NgxSpinnerService) {
    this.board = ["", "", "", "", "", "", "", "", ""];
    this.game = null;
    this.id = "";
  }

  ngOnInit(): void {
    this.spinner.show().then(r => r);
    this.route.paramMap.subscribe((param: ParamMap) => {
      this.id = <string>param.get('id');
      if (Number.isNaN(this.id)) {
        this.router.navigate(['/']).then((r) => r);
      } else {
        this.serviceGame
          .findGame(this.id)
          .pipe(
            finalize(() => {
              this.spinner.hide().then(r => r);
            })
          )
          .subscribe(
            (response) => {
              this.game = response;
            },
            (err) => {
              console.log(err.message);
            }
          );
      }
    });
  }

  public getArray(): string[] {
    let array: Array<string> = [];
    if (this.game != null) {
      for (let i = 0; i < this.game?.dataCurrentMovements.length; i++) {
        for (let j = 0; j < this.game?.dataCurrentMovements.length; j++) {
          array.push(this.game?.dataCurrentMovements[i][j]);
        }
      }
    }
    return array;
  }

  public play(index: number): void {
    let x: number = Math.floor(index / 3);
    let y: number = Math.floor(index % 3);
    this.move(new MoveReq(this.id, x, y));
  }

  public move(moveReq: MoveReq): void {
    this.serviceGame.move(moveReq)
      .subscribe((response) => {
          this.game = response;
          if (this.game.status == GameState.GameOver) {
            let winner = this.game.winner == "player1" ? this.game["player1"].namePlayer : this.game["player2"].namePlayer;
            this.mensajeInfo(`${winner} ha ganado!!`);
          }else if(this.game.status == GameState.TieldGame){
            this.mensajeInfo(`Es un empate, intentalo nuevamente`);
          }
        },
        (err) => {
          console.log(err.message);
          this.mensajeError(`Error al hacer movimiento, \npor favor intente nuevamente`);
        }
      );
  }

  public createGame(): void {
    if(this.game!=null) {
      let req: GameReq = new GameReq(
        new User(this.game?.player1.id, this.game?.player1.namePlayer),
        new User(this.game?.player2.id, this.game?.player2.namePlayer));
      this.serviceGame.createGame(req)
        .subscribe((response) => {
            this.router.navigate(['/game', response.id]).then(r => r)
          },
          (err) => {
            console.log(err.message);
            this.mensajeError(`Ha ocurrido un error al crear la partida`);
          }
        );
    }
  }

  public isGameFinished(): boolean {
    return this.game == null || this.game.status != GameState.Playing;
  }

  public isGameFinishedAndExist(): boolean {
    return this.game != null && this.game.status != GameState.Playing;
  }

  public mensajeOk(value: string): void {
    Swal.fire('Éxito', value, 'success').then(r => r);
  }

  public mensajeInfo(value: string): void {
    Swal.fire('', value, 'info').then(r => r);
  }

  public mensajeError(value: string): void {
    Swal.fire("Error", value, 'error').then(r => r);
  }

}
