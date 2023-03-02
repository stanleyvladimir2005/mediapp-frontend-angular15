import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {Specialty} from "../../model/specialty";
import {SpecialtyService} from "../../service/specialty.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {switchMap} from "rxjs";
import {MatDialog} from "@angular/material/dialog";
import {SpecialtyDialogComponent} from "./specialty-dialog/specialty-dialog.component";

@Component({
  selector: 'app-specialty',
  templateUrl: './specialty.component.html',
  styleUrls: ['./specialty.component.css']
})
export class SpecialtyComponent implements OnInit {

  displayedColumns: string[] = ['id', 'name', 'description', 'actions'];
  dataSource: MatTableDataSource<Specialty>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private _dialog: MatDialog,
    private snackBar: MatSnackBar,
    private specialtyService: SpecialtyService
  ) { }

  ngOnInit(): void {
    this.specialtyService.getSpecialtyChange().subscribe(data => {
      this.createTable(data);
    });

    this.specialtyService.getMessageChange().subscribe(data => {
      this.snackBar.open(data, 'INFO', { duration: 2000, verticalPosition: "top", horizontalPosition: "right" });
    });

    this.specialtyService.findAll().subscribe(data => {
      this.createTable(data);
    });
  }

  applyFilter(e: any) {
    this.dataSource.filter = e.target.value.trim().toLowerCase();
  }

  delete(idSpecialty: number){
    this.specialtyService.delete(idSpecialty).pipe(switchMap( ()=> {
      return this.specialtyService.findAll();
    }))
      .subscribe(data => {
        this.specialtyService.setSpecialtyChange(data);
        this.specialtyService.setMessageChange('DELETED!');
      })
    ;
  }

  createTable(specialtys: Specialty[]){
    this.dataSource = new MatTableDataSource(specialtys);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  openDialog(specialty?: Specialty){
    this._dialog.open(SpecialtyDialogComponent  , {
      width: '300px',
      data: specialty,
      disableClose: true
    });
  }
}
