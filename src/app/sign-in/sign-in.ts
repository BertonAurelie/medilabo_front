import { Component,inject } from '@angular/core';
import {FormsModule} from '@angular/forms';
import { LoginService } from '../service/login-service/login-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  imports: [FormsModule],
  templateUrl: './sign-in.html',
  styleUrl: './sign-in.scss'
})
export class SignIn {
  router = inject(Router);

  email:string = "";
  password:string ="";

  constructor(private loginService:LoginService){}

  navigateToPatient(){
    this.router.navigate(['/patientsList'])
  }
  loginPatient(){
    this.loginService.login(this.email, this.password).subscribe({
    next: res => {
      console.log('Login OK', res);
      this.navigateToPatient();     
    },
    error: err => {
      console.error('Erreur login', err);
    }
  });
  }

}
