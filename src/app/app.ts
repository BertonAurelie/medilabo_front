import { Component, signal } from '@angular/core';
import { Header } from './header/header';
import { DataService } from './service/data-service/data-service';
import { RouterLink, RouterOutlet } from '@angular/router';
import { MenuBar } from "./menu-bar/menu-bar";

@Component({
  selector: 'app-root',
  imports: [Header, RouterOutlet, MenuBar],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  
}
