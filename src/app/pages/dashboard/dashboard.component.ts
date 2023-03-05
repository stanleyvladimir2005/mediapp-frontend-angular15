import {Component, OnInit} from '@angular/core';
import {environment} from "../../../environments/environment";
import {MenuService} from "../../service/menu.service";
import {JwtHelperService} from "@auth0/angular-jwt";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit{
  username: string;

  constructor(
    private menuService: MenuService
  ){}

  ngOnInit(): void {
    const helper = new JwtHelperService();

    const decodedToken = helper.decodeToken(sessionStorage.getItem(environment.TOKEN_NAME));
    console.log(decodedToken);
    this.username = decodedToken.sub;

    this.menuService.getMenusByUser(this.username).subscribe(data => {
      this.menuService.setMenuChange(data);
    });
  }
}
