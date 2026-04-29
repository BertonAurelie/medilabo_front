import { Component } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LoginService } from '../service/login-service/login-service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './header.html',
  styleUrl: './header.scss'
})
export class Header {
  constructor(public auth: LoginService, private router: Router) {}

  logout(e: Event) {
    e.preventDefault();
    this.auth.logout().subscribe(() => this.router.navigate(['']));
  }
}
