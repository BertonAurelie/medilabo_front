import { Component } from '@angular/core';
import { Header } from './header/header';
import { RouterOutlet } from '@angular/router';
import { MenuBar } from "./menu-bar/menu-bar";
import { LoginService } from './service/login-service/login-service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [Header, RouterOutlet, MenuBar],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  constructor(private auth: LoginService) {
  this.auth.checkSession().subscribe();
}
}
