import { Injectable } from '@angular/core';
import * as domains from '../domains/domain';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {UserReq} from "../models/user-req";
import {User} from "../models/user";

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  public apiUser = domains.API_USER;

  constructor(private http: HttpClient) {
  }

  public createUser(user: UserReq): Observable<User> {
    return this.http.post<User>(this.apiUser + '/create-player', user);
  }

  public findUserByName(name: string): Observable<User> {
    return this.http.get<User>(`${this.apiUser}/player?nameplayer=${name}`);
  }

}
