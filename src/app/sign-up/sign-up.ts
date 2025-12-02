import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { PatientDtoPost } from '../interface/patientDtoPost';
import { DataService } from '../service/data-service/data-service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-sign-up',
  imports: [FormsModule, DatePipe],
  templateUrl: './sign-up.html',
  styleUrl: './sign-up.scss'
})
export class SignUp {
    patient: PatientDtoPost = {
    lastName: '',
    firstName: '',
    birthday: '',
    gender: '',
    address: '',
    zip:'',
    town:'',
    phoneNumber: '',
    email:'',
    password:''
  };

  constructor(private dataService: DataService) {}

  onSubmit(form: NgForm) {
    if (form.invalid) {
      return;
    }

    const fullAddress = `${this.patient.address} ${this.patient.zip} ${this.patient.town}`.trim();

    const dto = {
    lastName: this.patient.lastName,
    firstName: this.patient.firstName,
    birthday: this.patient.birthday,
    gender: this.patient.gender,
    address: fullAddress,
    phoneNumber: this.patient.phoneNumber,
    email: this.patient.email,
    password: this.patient.password
  };

    this.dataService.addPatient(dto).subscribe({
      next: (created) => {
        console.log('Patient créé : ', created);
        form.resetForm();
      },
      error: (err) => {
        console.error('Erreur lors de la création', err);
      }
    });
  }
}
