import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Patient } from '../../interface/patient.data';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  constructor(private http:HttpClient){}
  private url = "http://localhost:8080/patient";

  private url2 = "./data/data.json"

  getPatientList(): Observable<Patient[]>{
    return this.http.get<Patient[]>(this.url2 )
  }

  getPatient(id: number | string): Observable<Patient>{
    return this.http.get<Patient>(`${this.url}/${id}`);
  }
}
