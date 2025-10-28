import { Component,inject,Input,OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { DataService } from '../service/data-service/data-service';
import { Patient } from '../interface/patient.data';
import { Observable } from 'rxjs';
import { AsyncPipe, DatePipe } from '@angular/common';

@Component({
  selector: 'app-patient-page',
  imports: [RouterLink, AsyncPipe, DatePipe],
  templateUrl: './patient-page.html',
  styleUrl: './patient-page.scss'
})
export class PatientPage {
  patient$!: Observable<Patient>
  private dataService2 = inject(DataService);

  @Input()
  set id(id: string){
    this.patient$ = this.dataService2.getPatient(id);
  }

  calculAge(birthday: string): number {
    let birthdayDate = new Date(birthday);
    let timeDiff = Math.abs(Date.now() - birthdayDate.getTime());
    let age = Math.floor((timeDiff/(1000 * 3600 * 24))/ 365.25);

    return age;
  }
}
