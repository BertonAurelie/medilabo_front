import { Component, inject, OnInit, signal } from '@angular/core';
import { DataService } from '../service/data-service/data-service';
import { CommonModule, DatePipe } from '@angular/common';
import { Patient } from '../interface/patient.data';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ReportService } from '../service/report-service/report-service';

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
  public patientId?: number;
  showDeleteModal = false;
  userIdToDelete: number | null = null;

  constructor(private dataService:DataService, private reportService:ReportService){}

  loadPatients() {
    this.dataService.getPatientList().subscribe((data) => {
      this.patients.set(data);
    });
  }
  ngOnInit(){
    this.loadPatients();
    console.log(this.patients)  
  }
  

  navigateToPatient(id: number){
    this.router.navigate(['/patient', id])
  }

  validEdit(patient: Patient){
    if(!patient.firstName || !patient.lastName || !patient.birthday || !patient.gender || !patient.address ||!patient.phoneNumber){
      alert("attention, aucun champs ne doit être vide.")
    } else if(patient.gender != "F" && patient.gender != "M" ){
      alert(" Merci d'indiquer un genre valide (F ou M)")
    }else {
      console.log(patient);
      this.dataService.editPatient(patient).subscribe();

      patient.isEditable = false;
      this.patient = undefined;
      this.patientId = undefined;
    }
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

  deletePatient(id: number) {
    console.log(id);
    this.dataService.deletePatient(id).subscribe();
    this.reportService.deleteReport(id).subscribe();
  }

  openDeleteModal(id: number) {
    this.userIdToDelete = id;
    this.showDeleteModal = true;
  }

  closeDeleteModal() {
    this.showDeleteModal = false;
    this.userIdToDelete = null;
  }

  confirmDelete() {
    if (this.userIdToDelete != null) {
      this.dataService.deletePatient(this.userIdToDelete).subscribe(() => {
        console.log("Utilisateur supprimé !");
        this.closeDeleteModal();
        this.loadPatients();
      });
    }
  }
}


