import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { Patient } from '../../interface/patient.data';
import { error } from 'node:console';
import { urlToHttpOptions } from 'node:url';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  constructor(private http:HttpClient){}
  private url = "http://localhost:8081/patient";

  private url2 = "./data/data.json"

  getPatientList(): Observable<Patient[]>{
    return this.http.get<Patient[]>(this.url)
  }

  getPatient(id: number | string): Observable<Patient>{
    return this.http.get<Patient>(`${this.url}/${id}`);
  }

  editPatient(patient: Patient): Observable<Patient>{
    return this.http.put<Patient>(`${this.url}`, patient).pipe(
      catchError(err => {
            console.log('Handling error locally and rethrowing it...', err);
            return throwError(() => err);
        })
    );
  }

  deletePatient(id: number): Observable<void>{
    return this.http.delete<void>(`${this.url}/delete/${id}`) .pipe(
      catchError(err => {
        console.log('handling delete error', err);
        return throwError(() => err);
      })
    )
  }

}
