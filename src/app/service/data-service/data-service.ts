import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Patient } from '../../interface/patient.data';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  constructor(private http:HttpClient){}

  getPatientList(): Observable<Patient[]>{
    const url ="./data/data.json";
    return this.http.get<Patient[]>(url)
  }
}
