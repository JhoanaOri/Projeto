import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Authenticate } from '../model/authenticate.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private user: Authenticate;
  private auth = new Subject<Authenticate>();

  private headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
  
  constructor() {
  }

  public getAuth() : Observable<Authenticate> {
      return this.auth;
  }

  setAuth(data: Authenticate) {
      this.user = Object.assign(data);
      this.auth.next(this.user);
  }
 
}
