import { Injectable } from '@angular/core';
import * as domains from "../domains/domain";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {GameReq} from "../models/game-req";
import {Game} from "../models/game";
import {MoveReq} from "../models/move-req";

@Injectable({
  providedIn: 'root'
})
export class GameService {

  public apiUser = domains.API_GAME;

  constructor(private http: HttpClient) {
  }

  public createGame(game: GameReq): Observable<Game> {
    return this.http.post<Game>(this.apiUser + '/create-game', game);
  }

  public findGame(id: string): Observable<Game> {
    return this.http.get<Game>(`${this.apiUser}/get-game?id=${id}`);
  }

  public move(move: MoveReq): Observable<Game> {
    return this.http.post<Game>(this.apiUser + '/add-movement', move);
  }

}
