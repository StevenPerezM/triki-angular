import {Component, OnInit} from '@angular/core';
import {faSearch, faPlus, faTrash} from '@fortawesome/free-solid-svg-icons';
import {User} from "../../models/user";
import {UsersService} from "../../services/users.service";
import Swal from 'sweetalert2';
import {GameService} from "../../services/game.service";
import {GameReq} from "../../models/game-req";
import {Router} from "@angular/router";
import {UserReq} from "../../models/user-req";
import {NgxSpinnerService} from "ngx-spinner";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  public faSearch = faSearch;
  public faPlus = faPlus;
  public faTrash = faTrash;
  public action: string;

  public player1: User;
  public player2: User;

  constructor(private serviceUser: UsersService, private serviceGame: GameService,
              private router: Router, private spinner: NgxSpinnerService) {
    this.player1 = new User('', '');
    this.player2 = new User('', '');
    this.action = "";
  }

  ngOnInit(): void {
  }

  public onSubmit(player: string) {
    this.spinner.show().then(r => r);
    if (this.action == "add") {
      player == "player1" ? this.savePlayer1() : this.savePlayer2();
    } else {
      player == "player1" ? this.searchPlayer1() : this.searchPlayer2();
    }
  }

  public searchPlayer1(): void {
    this.serviceUser.findUserByName(this.player1.namePlayer)
      .subscribe((response) => {
          this.spinner.hide().then(r => r);
          this.player1 = response;
        },
        (err) => {
          console.log(err);
          this.spinner.hide().then(r => r);
          this.mensajeError(`Jugador no encontrado, \nintente nuevamente o cree uno nuevo`);
        }
      );
  }

  public searchPlayer2(): void {
    this.serviceUser.findUserByName(this.player2.namePlayer)
      .subscribe((response) => {
          this.player2 = response;
          this.spinner.hide().then(r => r);
        },
        (err) => {
          console.log(err);
          this.spinner.hide().then(r => r);
          this.mensajeError(`Jugador no encontrado, \nintente nuevamente o cree uno nuevo`);
        }
      );
  }

  public savePlayer1(): void {
    let playerReq: UserReq = new UserReq(this.player1.namePlayer);
    this.serviceUser.createUser(playerReq)
      .subscribe((response) => {
          this.mensajeOk(`El jugador ${response.namePlayer} has sido creado.`);
          this.player1 = response;
          this.spinner.hide().then(r => r);
        },
        (err) => {
          console.log(err);
          this.player1 = new User('', '');
          this.spinner.hide().then(r => r);
          this.mensajeError(`Ha ocurrido un error al crear jugador`);
        }
      );
  }

  public savePlayer2(): void {
    let playerReq: UserReq = new UserReq(this.player2.namePlayer);
    this.serviceUser.createUser(playerReq)
      .subscribe((response) => {
          this.mensajeOk(`El jugador ${response.namePlayer} has sido creado.`);
          this.player2 = response;
          this.spinner.hide().then(r => r);
        },
        (err) => {
          console.log(err);
          this.spinner.hide().then(r => r);
          this.player2 = new User('', '');
          this.mensajeError(`Ha ocurrido un error al crear jugador`);
        }
      );
  }

  public createGame(): void {
    this.spinner.show().then(r => r);
    let req: GameReq = new GameReq(this.player1, this.player2);
    this.serviceGame.createGame(req)
      .subscribe((response) => {
          this.spinner.hide().then(r => r);
          this.router.navigate(['/game', response.id]).then(r => r)
        },
        (err) => {
          console.log(err);
          this.mensajeError(`Ha ocurrido un error al crear la partida`);
        }
      );
  }

  public isEmpty(player: User): boolean {
    return player.id === "";
  }

  public mensajeOk(value: string): void {
    Swal.fire('Éxito', value, 'success').then(r => r);
  }

  public mensajeError(value: string): void {
    Swal.fire(value, 'Error', 'error').then(r => r);
  }

  public resetPlayer(player: string): void {
    if (player == "player1") {
      this.player1 = new User("", "");
    } else {
      this.player2 = new User("", "");
    }
  }

  public setAcion(action: string) {
    this.action = action;
  }

}
