import {Component, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {Medic} from "../../model/medic";
import {Specialty} from "../../model/specialty";
import {Exam} from "../../model/exam";
import {ConsultDetail} from "../../model/consultDetail";
import {Patient} from "../../model/patient";
import {PatientService} from "../../service/patient.service";
import {MedicService} from "../../service/medic.service";
import {ConsultService} from "../../service/consult.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {ExamService} from "../../service/exam.service";
import {SpecialtyService} from "../../service/specialty.service";
import {consultListExamDTOI} from "../../dto/consultListExamDTOI";
import {Consult} from "../../model/consult";
import * as moment from 'moment';

@Component({
  selector: 'app-consult',
  templateUrl: './consult.component.html',
  styleUrls: ['./consult.component.css']
})
export class ConsultComponent implements OnInit{

  idPatientSelected: number;
  idMedicSelected: number;
  idSpecialtySelected: number;
  idExamSelected: number;
  dateSelected: Date;

  patients$: Observable<Patient[]>;
  medics$: Observable<Medic[]>;
  specialties$: Observable<Specialty[]>;
  exams$: Observable<Exam[]>;

  minDate: Date = new Date();

  diagnosis: string;
  treatment: string;
  details: ConsultDetail[] = [];
  examsSelected: Exam[] = [];

  constructor(
    private patientService: PatientService,
    private medicService: MedicService,
    private examService: ExamService,
    private specialtyService: SpecialtyService,
    private consultService: ConsultService,
    private _snackBar: MatSnackBar
  ){

  }
  ngOnInit(): void {
    this.getInitialData();
  }

  getInitialData(){
    this.patients$ = this.patientService.findAll();
    this.medics$ = this.medicService.findAll();
    this.specialties$ = this.specialtyService.findAll();
    this.exams$ = this.examService.findAll();
  }

  onChangeDate(e: any){
    console.log(e);
  }

  addDetail(){
    let det = new ConsultDetail();
    det.diagnosis = this.diagnosis;
    det.treatment = this.treatment;

    this.details.push(det);
  }

  removeDetail(index: number){
    this.details.splice(index, 1);
  }

  addExam(){
    if(this.idExamSelected > 0){
      this.examService.findById(this.idExamSelected).subscribe(data => this.examsSelected.push(data));
    }else{
      this._snackBar.open('Please select an exam', 'INFO', {duration: 2000});
    }
  }

  save(){
    const patient = new Patient();
    patient.idPatient = this.idPatientSelected;

    const medic = new Medic();
    medic.idMedic = this.idMedicSelected;

    const specialty = new Specialty();
    specialty.idSpecialty = this.idSpecialtySelected

    const consult = new Consult;
    consult.patient = patient
    consult.medic = medic;
    consult.specialty = specialty;
    consult.numberConsult = "C1";
    consult.details = this.details;
        consult.consultDate = moment(this.dateSelected).format('YYYY-MM-DDTHH:mm:ss');

    const dto: consultListExamDTOI = {
      consult: consult,
      listExam: this.examsSelected
    };

    this.consultService.saveTransactional(dto).subscribe(()=>{
      this._snackBar.open('CREATED', 'INFO', {duration: 2000});

      setTimeout( ()=>{
        this.cleanControls();
      }, 2000 )
    });
  }

  cleanControls(){
    this.idExamSelected = 0;
    this.idPatientSelected = 0;
    this.idSpecialtySelected = 0;
    this.idMedicSelected = 0;
    this.dateSelected = new Date();
    this.diagnosis = null;
    this.treatment = null;
    this.details = [];
    this.examsSelected = [];
  }
}
