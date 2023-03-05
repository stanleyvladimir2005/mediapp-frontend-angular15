import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {environment} from "../../environments/environment";

interface ILoginRequest{
  username: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private url: string = `${environment.HOST}/login`;

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  login(username: string, password: string){
    const body: ILoginRequest = { username, password };
    return this.http.post<any>(this.url, body);
  }

  logout(){
    sessionStorage.clear();
    this.router.navigate(['login']);
  }

  isLogged() {
    let token = sessionStorage.getItem(environment.TOKEN_NAME);
    return token != null;
  }
}
