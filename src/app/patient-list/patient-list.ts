import { Component, OnInit } from '@angular/core';
import { DataService } from '../service/data-service/data-service';
import { CommonModule } from '@angular/common';
import { Patient } from '../interface/patient.data';

@Component({
  selector: 'app-patient-list',
  imports: [CommonModule],
  templateUrl: './patient-list.html',
  styleUrl: './patient-list.scss'
})
export class PatientList implements OnInit{
  constructor(private dataService:DataService){}

  patients: Patient[] = [];

  ngOnInit(): void{
    this.dataService.getPatientList().subscribe((data: Patient[]) => {
      this.patients = data;
      //console.log(this.patients)
    })
  }
}
