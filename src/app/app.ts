import { Component, signal } from '@angular/core';
import { Header } from './header/header';
import { DataService } from './service/data-service/data-service';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [Header, RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  
}
