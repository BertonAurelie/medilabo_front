import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { Patient } from '../../interface/patient.data';
import { PatientDtoPost } from '../../interface/patientDtoPost';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  constructor(private http:HttpClient){}
  private url = "http://localhost:8080/patient";

  private url2 = "./data/data.json"

  getPatientList(): Observable<Patient[]>{
    return this.http.get<Patient[]>(this.url, {withCredentials: true} )
  }

  getPatient(id: number | string): Observable<Patient>{
    return this.http.get<Patient>(`${this.url}/${id}`, {withCredentials: true});
  }

  editPatient(patient: Patient): Observable<Patient>{
    return this.http.put<Patient>(`${this.url}`, patient, {withCredentials: true}).pipe(
      catchError(err => {
            console.log('Handling error locally and rethrowing it...', err);
            return throwError(() => err);
        })
    );
  }

  deletePatient(id: number): Observable<void> {
    return this.http.delete<void>(
      `${this.url}/delete/${id}`,
      { withCredentials: true }
    );
  }

  addPatient(patient: PatientDtoPost): Observable<Patient> {
  return this.http.post<Patient>(`${this.url}/add`, patient, { withCredentials: true }).pipe(
    catchError(err => {
      console.log('handling add error', err);
      return throwError(() => err);
    })
  );
}

}
