import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {switchMap} from "rxjs";
import {ExamService} from "../../../service/exam.service";
import {Exam} from "../../../model/exam";

@Component({
  selector: 'app-exam-dialog',
  templateUrl: './exam-dialog.component.html',
  styleUrls: ['./exam-dialog.component.css']
})
export class ExamDialogComponent implements OnInit {
  exam: Exam;

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: Exam,
    private _dialogRef: MatDialogRef<ExamDialogComponent>,
    private examService: ExamService
  ){}

  ngOnInit(): void {
    this.exam = {... this.data};
  }

  operate(){
    if(this.exam != null && this.exam.idExam > 0){
      //UPDATE
      this.examService.update(this.exam, this.exam.idExam)
        .pipe(switchMap( ()=> this.examService.findAll()))
        .subscribe(data => {
          this.examService.setExamChange(data);
          this.examService.setMessageChange('UPDATED!')
        });
    }else{
      //INSERT
      this.examService.save(this.exam)
        .pipe(switchMap( ()=> this.examService.findAll()))
        .subscribe(data => {
          console.log(data);
          this.examService.setExamChange(data);
          this.examService.setMessageChange('CREATED!')
        });
    }
    this.close();
  }

  close(){
    this._dialogRef.close();
  }
}
