import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {switchMap} from "rxjs";
import {Specialty} from "../../../model/specialty";
import {SpecialtyService} from "../../../service/specialty.service";

@Component({
  selector: 'app-specialty-dialog',
  templateUrl: './specialty-dialog.component.html',
  styleUrls: ['./specialty-dialog.component.css']
})
export class SpecialtyDialogComponent implements OnInit {

  specialty: Specialty;

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: Specialty,
    private _dialogRef: MatDialogRef<SpecialtyDialogComponent>,
    private specialtyService: SpecialtyService
  ){}

  ngOnInit(): void {
    this.specialty = {... this.data};
  }

  operate(){
    if(this.specialty != null && this.specialty.idSpecialty > 0){
      this.specialtyService.update(this.specialty, this.specialty.idSpecialty)
        .pipe(switchMap( ()=> this.specialtyService.findAll()))
        .subscribe(data => {
          this.specialtyService.setSpecialtyChange(data);
          this.specialtyService.setMessageChange('UPDATED!')
        });
    }else{
      this.specialtyService.save(this.specialty)
        .pipe(switchMap( ()=> this.specialtyService.findAll()))
        .subscribe(data => {
          console.log(data);
          this.specialtyService.setSpecialtyChange(data);
          this.specialtyService.setMessageChange('CREATED!')
        });
    }
    this.close();
  }

  close(){
    this._dialogRef.close();
  }
}
