import { Component,OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../service/data-service/data-service';
import { Patient } from '../interface/patient.data';

@Component({
  selector: 'app-patient-page',
  imports: [],
  templateUrl: './patient-page.html',
  styleUrl: './patient-page.scss'
})
export class PatientPage implements OnInit {
  patient?: Patient;

  constructor(private activated: ActivatedRoute, private dataService: DataService){}

  ngOnInit():void {
    this.activated.paramMap.subscribe(
      (data) => {
        console.log(data)
        const id = data.get('id');
        if(!id) return;

        this.dataService.getPatient(id).subscribe(p =>{
          console.log(p)
          this.patient = p;
        })

      }
    )
  }



}
