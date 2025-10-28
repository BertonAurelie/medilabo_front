import { Component, inject, OnInit, signal } from '@angular/core';
import { DataService } from '../service/data-service/data-service';
import { CommonModule, DatePipe } from '@angular/common';
import { Patient } from '../interface/patient.data';
import { Router } from '@angular/router';
import { FormsModule, NgModel } from '@angular/forms';
import { empty } from 'rxjs';

@Component({
  standalone: true,
  selector: 'app-patient-list',
  imports: [CommonModule, DatePipe, FormsModule],
  templateUrl: './patient-list.html',
  styleUrl: './patient-list.scss'
})
export class PatientList implements OnInit{
  private router = inject(Router);

  patients= signal<Patient[]>([]);

  public  patient?: Patient;
  public patientId?: string;

  constructor(private dataService:DataService){}

  ngOnInit(){
    this.dataService.getPatientList().subscribe((data) => 
      this.patients.set(data));
      console.log(this.patients)  
  }
  

  navigateToPatient(id: string){
    this.router.navigate(['/patient', id])
  }
  
  cancelEdit(row: Patient){
    if(this.patientId == row.id && this.patient){
      Object.assign(row, this.patient)
    }

    row.isEditable = false;
    this.patient = undefined;
    this.patientId = undefined;
  }

  onEdit(row: Patient){
    if(this.patientId && this.patientId !== row.id) return; 
    
    this.patient = structuredClone(row);
    this.patientId = row.id;
    
    row.isEditable = true;
    }
}
