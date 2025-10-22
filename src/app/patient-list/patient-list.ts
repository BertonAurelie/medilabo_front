import { Component, OnInit } from '@angular/core';
import { DataService } from '../service/data-service/data-service';
import { CommonModule } from '@angular/common';
import { Patient } from '../interface/patient.data';
import { Router } from '@angular/router';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-patient-list',
  imports: [CommonModule,RouterLink],
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

  editPatient(p: number, event?: MouseEvent): number {
    event?.stopPropagation();
    console.log(p);
    return p;
  }

  
}
