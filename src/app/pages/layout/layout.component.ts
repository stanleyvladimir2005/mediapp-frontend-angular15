import {Component, OnInit} from '@angular/core';
import {LoginService} from "../../service/login.service";
import {MenuService} from "../../service/menu.service";
import {Menu} from "../../model/menu";

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {
  menus: Menu[];

  constructor(
    private menuService: MenuService,
    private loginService: LoginService
  ){}

  ngOnInit(): void {
    this.menuService.getMenuChange().subscribe(data => {
      this.menus = data;
    });
  }

  logout(){
    this.loginService.logout();
  }
}
