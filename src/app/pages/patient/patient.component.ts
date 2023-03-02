import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {Patient} from "../../model/patient";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {PatientService} from "../../service/patient.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {switchMap} from "rxjs";
import {PatientDialogComponent} from "./patient-dialog/patient-dialog.component";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.css']
})
export class PatientComponent implements OnInit{

  displayedColumns: string[] = ['id', 'firstName', 'lastName', 'dui', 'actions'];
  dataSource: MatTableDataSource<Patient>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private patientService: PatientService,
    private _snackBar: MatSnackBar,
    private _dialog: MatDialog
  ){ }

  ngOnInit(): void {
    this.patientService.getPatientChange().subscribe(data => {
      this.createTable(data);
    });

    this.patientService.getMessageChange().subscribe(data => {
      this._snackBar.open(data, 'INFO', {duration: 2000 /*, horizontalPosition: 'right', verticalPosition: 'top'*/});
    });

    this.patientService.findAll().subscribe(data => {
      this.createTable(data);
    });
  }

  applyFilter(e: any){
    this.dataSource.filter = e.target.value.trim();
  }

  createTable(data: Patient[]){
    this.dataSource = new MatTableDataSource(data);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  delete(idPatient: number){
    this.patientService.delete(idPatient).pipe(switchMap( ()=>{
      return this.patientService.findAll();
    }))
      .subscribe(data => {
        this.patientService.setPatientChange(data);
        this.patientService.setMessageChange("DELETED!");
      });
  }

  openDialog(patient?: Patient){
    this._dialog.open(PatientDialogComponent  , {
      width: '400px',
      data: patient,
      disableClose: true
    });
  }
}
