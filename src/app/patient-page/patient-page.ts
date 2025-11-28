import { Component,inject,Input,OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { DataService } from '../service/data-service/data-service';
import { Patient } from '../interface/patient.data';
import { Observable } from 'rxjs';
import { AsyncPipe, DatePipe, NgClass } from '@angular/common';
import { ReportService } from '../service/report-service/report-service';
import { Reportt } from '../interface/report.data';
import { FormsModule, NgModel } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-patient-page',
  imports: [RouterLink, AsyncPipe, DatePipe, FormsModule, NgClass],
  templateUrl: './patient-page.html',
  styleUrl: './patient-page.scss'
})
export class PatientPage {
  patient$!: Observable<Patient>
  reportt$!: Observable<Reportt[]>
  public report: Reportt = {patient: 0, note: ''};
  public diabetesRisk: string = "";

  private dataService2 = inject(DataService);
  private reportService = inject(ReportService); 
  private route = inject(ActivatedRoute);

  @Input()
  set id(id: number) {
    if (id) {
      this.loadForPatient(id);
    }
  }

  ngOnInit(): void {
    if (!this.report.patient) {
      const idFromRoute = Number(this.route.snapshot.paramMap.get('id'));
      if (idFromRoute) {
        this.loadForPatient(idFromRoute);
      }
    }
  }

  private loadForPatient(id: number) {
  this.patient$ = this.dataService2.getPatient(id);
  this.reportt$ = this.reportService.getReport(id);
  this.report.patient = id;

  this.dataService2.getPatient(id).subscribe(patient => {
    const age = this.calculAge(patient.birthday);
    const gender = patient.gender;

    this.reportService.getDiabetesRisk(id, age, gender).subscribe(risk => {
      this.diabetesRisk = risk;
      console.log("risk:", risk);
    });
  });
}

  calculAge(birthday: string): number {
    const birthdayDate = new Date(birthday);
    const timeDiff = Math.abs(Date.now() - birthdayDate.getTime());
    return Math.floor((timeDiff / (1000 * 3600 * 24)) / 365.25);
  }

  addReport(): void {
    if (!this.report.patient || !this.report.note?.trim()) return;

    this.reportService.addnewReport(this.report).subscribe({
      next: () => {
        console.log("id add report : " + this.report.patient)
        this.report.note = '';
        this.reportt$ = this.reportService.getReport(this.report.patient);
      },
      error: (err) => console.error(err),
    });
  }

  

}
