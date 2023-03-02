import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {switchMap} from "rxjs";
import {Patient} from "../../../model/patient";
import {PatientService} from "../../../service/patient.service";

@Component({
  selector: 'app-patient-dialog',
  templateUrl: './patient-dialog.component.html',
  styleUrls: ['./patient-dialog.component.css']
})
export class PatientDialogComponent implements OnInit {
  patient: Patient;

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: Patient,
    private _dialogRef: MatDialogRef<PatientDialogComponent>,
    private patientService: PatientService
  ){
  }

  ngOnInit(): void {
    this.patient = {... this.data};
  }

  operate(){
    if(this.patient != null && this.patient.idPatient > 0){
      this.patientService.update(this.patient, this.patient.idPatient)
        .pipe(switchMap( ()=> this.patientService.findAll()))
        .subscribe(data => {
          this.patientService.setPatientChange(data);
          this.patientService.setMessageChange('UPDATED!')
        });
    }else{
      this.patientService.save(this.patient)
        .pipe(switchMap( ()=> this.patientService.findAll()))
        .subscribe(data => {
          console.log(data);
          this.patientService.setPatientChange(data);
          this.patientService.setMessageChange('CREATED!')
        });
    }
    this.close();
  }

  close(){
    this._dialogRef.close();
  }
}
