import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {MatSnackBar} from "@angular/material/snack-bar";
import {MatDialog} from "@angular/material/dialog";
import {Sing} from "../../model/sing";
import {SingService} from "../../service/sing.service";
import {switchMap} from "rxjs";
import {SingDialogComponent} from "./sing-dialog/sing-dialog.component";
import {PatientDialogComponent} from "../patient/patient-dialog/patient-dialog.component";

@Component({
  selector: 'app-sing',
  templateUrl: './sing.component.html',
  styleUrls: ['./sing.component.css']
})
export class SingComponent implements OnInit {

  displayedColumns: string[] = ['id','temperature', 'pulse', 'respiratoryRate', 'actions'];
  dataSource: MatTableDataSource<Sing>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private singService: SingService,
    private _snackBar: MatSnackBar,
    private _dialog: MatDialog
  ){ }

  ngOnInit(): void {
    this.singService.getSingChange().subscribe(data => {
      this.createTable(data);
    });

    this.singService.getMessageChange().subscribe(data => {
      this._snackBar.open(data, 'INFO', {duration: 2000 /*, horizontalPosition: 'right', verticalPosition: 'top'*/});
    });

    this.singService.findAll().subscribe(data => {
      this.createTable(data);
    });
  }

  applyFilter(e: any){
    this.dataSource.filter = e.target.value.trim();
  }

  createTable(data: Sing[]){
    this.dataSource = new MatTableDataSource(data);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  delete(idSing: number){
    this.singService.delete(idSing).pipe(switchMap( ()=>{
      return this.singService.findAll();
    }))
      .subscribe(data => {
        this.singService.setSingChange(data);
        this.singService.setMessageChange("DELETED!");
      });
  }

  openDialog(sing?: Sing){
    this._dialog.open(SingDialogComponent  , {
      width: '400px',
      data: sing,
      disableClose: true
    });
  }

  openDialog2(sing?: Sing){
    this._dialog.open(PatientDialogComponent  , {
      width: '400px',
      data: sing,
      disableClose: true
    });
  }
}
