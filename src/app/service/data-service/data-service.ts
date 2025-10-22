import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Patient } from '../../interface/patient.data';
import { ActivatedRoute } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  constructor(private http:HttpClient){}
  private url ="./data/data.json";

  getPatientList(): Observable<Patient[]>{
    return this.http.get<Patient[]>(this.url)
  }


  getPatient(id: number | string): Observable<Patient>{
    return this.http.get<Patient>(`${this.url}/patient/${id}`);
  }
}
