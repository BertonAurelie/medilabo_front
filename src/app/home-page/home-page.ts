import { Component } from '@angular/core';
import { PatientList } from '../patient-list/patient-list';

@Component({
  selector: 'app-home-page',
  imports: [PatientList],
  templateUrl: './home-page.html',
  styleUrl: './home-page.scss'
})
export class HomePage {

}
