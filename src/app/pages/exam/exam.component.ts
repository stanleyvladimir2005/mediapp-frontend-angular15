import {Component, OnInit, ViewChild} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import {Exam} from "../../model/exam";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {MatDialog} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";
import {ExamService} from "../../service/exam.service";
import {switchMap} from "rxjs";

@Component({
  selector: 'app-exam',
  templateUrl: './exam.component.html',
  styleUrls: ['./exam.component.css']
})
export class ExamComponent implements OnInit {

  displayedColumns: string[] = ['id', 'name', 'description', 'actions'];
  dataSource: MatTableDataSource<Exam>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private examService: ExamService
  ) { }

  ngOnInit(): void {
    this.examService.getExamChange().subscribe(data => {
      this.createTable(data);
    });

    this.examService.getMessageChange().subscribe(data => {
      this.snackBar.open(data, 'INFO', { duration: 2000, verticalPosition: "top", horizontalPosition: "right" });
    });

    this.examService.findAll().subscribe(data => {
      this.createTable(data);
    });
  }

  applyFilter(e: any) {
    this.dataSource.filter = e.target.value.trim().toLowerCase();
  }

  delete(idExam: number){
    this.examService.delete(idExam).pipe(switchMap( ()=> {
      return this.examService.findAll();
    }))
      .subscribe(data => {
        this.examService.setExamChange(data);
        this.examService.setMessageChange('DELETED!');
      })
    ;
  }

  createTable(exams: Exam[]){
    this.dataSource = new MatTableDataSource(exams);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
}
