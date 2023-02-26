import {Component, Inject, OnInit} from '@angular/core';
import {Medic} from "../../../model/medic";
import {MatDialogRef, MAT_DIALOG_DATA} from "@angular/material/dialog";
import {MedicService} from "../../../service/medic.service";
import {switchMap} from "rxjs";

@Component({
  selector: 'app-medic-dialog',
  templateUrl: './medic-dialog.component.html',
  styleUrls: ['./medic-dialog.component.css']
})
export class MedicDialogComponent implements OnInit {

  medic: Medic;

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: Medic,
    private _dialogRef: MatDialogRef<MedicDialogComponent>,
    private medicService: MedicService
  ){
  }

  ngOnInit(): void {
    this.medic = {... this.data};
  }

  operate(){
    if(this.medic != null && this.medic.idMedic > 0){
      //UPDATE
      this.medicService.update(this.medic, this.medic.idMedic)
        .pipe(switchMap( ()=> this.medicService.findAll()))
        .subscribe(data => {
          this.medicService.setMedicChange(data);
          this.medicService.setMessageChange('UPDATED!')
        });
    }else{
      //INSERT
      this.medicService.save(this.medic)
        .pipe(switchMap( ()=> this.medicService.findAll()))
        .subscribe(data => {
          this.medicService.setMedicChange(data);
          this.medicService.setMessageChange('CREATED!')
        });
    }
    this.close();
  }

  close(){
    this._dialogRef.close();
  }
}
