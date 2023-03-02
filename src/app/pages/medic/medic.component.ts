import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {Medic} from "../../model/medic";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {MatSnackBar} from "@angular/material/snack-bar";
import {MatDialog} from "@angular/material/dialog";
import {switchMap} from "rxjs";
import {MedicService} from "../../service/medic.service";
import {MedicDialogComponent} from "./medic-dialog/medic-dialog.component";

@Component({
  selector: 'app-medic',
  templateUrl: './medic.component.html',
  styleUrls: ['./medic.component.css']
})
export class MedicComponent implements OnInit {

  displayedColumns: string[] = ['id', 'firstName', 'lastName', 'dui', 'actions'];
  dataSource: MatTableDataSource<Medic>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private medicService: MedicService,
    private _snackBar: MatSnackBar,
    private _dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.medicService.getMedicChange().subscribe(data => {
      this.createTable(data);
    });

    this.medicService.getMessageChange().subscribe(data => {
      this._snackBar.open(data, 'INFO', {duration: 2000});
    });

    this.medicService.findAll().subscribe(data => {
      this.createTable(data);
    });
  }

  createTable(medics: Medic[]) {
    this.dataSource = new MatTableDataSource(medics);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(e: any) {
    this.dataSource.filter = e.target.value.trim().toLowerCase();
  }

  openDialog(medic?: Medic){
    this._dialog.open(MedicDialogComponent  , {
      width: '400px',
      data: medic,
      disableClose: true
    });
  }

  delete(id: number){
    this.medicService.delete(id).pipe(switchMap( ()=> {
      return this.medicService.findAll()
    }))
      .subscribe(data => {
        this.medicService.setMedicChange(data);
        this.medicService.setMessageChange('DELETED!');
      });
  }
}
