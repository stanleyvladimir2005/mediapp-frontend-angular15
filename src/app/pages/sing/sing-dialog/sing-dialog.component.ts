import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Observable, switchMap} from "rxjs";
import {Sing} from "../../../model/sing";
import {SingService} from "../../../service/sing.service";
import {PatientService} from "../../../service/patient.service";
import {Patient} from "../../../model/patient";

@Component({
  selector: 'app-sing-dialog',
  templateUrl: './sing-dialog.component.html',
  styleUrls: ['./sing-dialog.component.css']
})
export class SingDialogComponent implements OnInit {
  sing: Sing;
  idPatientSelected: number;
  patients$: Observable<Patient[]>;
  minDate: Date = new Date();
  selected: boolean;

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: Sing,
    private patientService: PatientService,
    private _dialogRef: MatDialogRef<SingDialogComponent>,
    private singService: SingService
  ){
  }

  ngOnInit(): void {
    this.sing = {... this.data};
    this.patients$ = this.patientService.findAll();
  }

  operate(){
    if(this.sing  != null && this.sing .idSing > 0){
      this.singService.update(this.sing, this.sing.idSing)
        .pipe(switchMap( ()=> this.singService.findAll()))
        .subscribe(data => {
          this.singService.setSingChange(data);
          this.singService.setMessageChange('UPDATED!')
        });
    }else{
      this.singService.save(this.sing)
        .pipe(switchMap( ()=> this.singService.findAll()))
        .subscribe(data => {
          console.log(data);
          this.singService.setSingChange(data);
          this.singService.setMessageChange('CREATED!')
        });
    }
    this.close();
  }

  onChangeDate(e: any){
    console.log(e);
  }

  close(){
    this._dialogRef.close();
  }
}
