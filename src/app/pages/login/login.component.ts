import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {LoginService} from "../../service/login.service";
import '../../../assets/login-animation.js';
import {environment} from "../../../environments/environment";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username: string;
  password: string;
  message: string;
  error: string;

  constructor(
    private loginService: LoginService,
    private router: Router
  ){}

  ngOnInit(): void {
  }

  login(){
    this.loginService.login(this.username, this.password).subscribe(data => {
      sessionStorage.setItem(environment.TOKEN_NAME, data.jwtToken);
      //localStorage.setItem
      this.router.navigate(['/pages/dashboard']);
    });
  }

  ngAfterViewInit() {
    (window as any).initialize();
  }
}
