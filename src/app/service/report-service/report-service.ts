import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { Reportt } from '../../interface/report.data';

@Injectable({
  providedIn: 'root'
})

export class ReportService {
  constructor(private http:HttpClient){}
  private url="http://localhost:8082/report";
  private url2 = "http://localhost:8083/diabetes"

  getReport(patient:number): Observable<Reportt[]>{
    return this.http.get<Reportt[]>(`${this.url}/${patient}`,{
      params:{patient: patient}
    })
  }

  addnewReport(report:Reportt): Observable<Report>{
    return this.http.post<Report>(`${this.url}`, report).pipe(
      catchError(err => {
            console.log('error add new report', err);
            return throwError(() => err);
        }))}
  
  getDiabetesRisk(id: number, age: number, gender: string): Observable<string> {
    return this.http.get(`${this.url2}`, {
      params: { id, age, gender },
      responseType: 'text'  
    }) as Observable<string>;
  }
}
