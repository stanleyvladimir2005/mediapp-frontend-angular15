import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {PatientService} from "../../../service/patient.service";
import {Patient} from "../../../model/patient";
import {switchMap} from "rxjs";

@Component({
  selector: 'app-patient-edit',
  templateUrl: './patient-edit.component.html',
  styleUrls: ['./patient-edit.component.css']
})
export class PatientEditComponent implements OnInit {

  id: number;
  isEdit: boolean;
  form: FormGroup;

  constructor(
    private patientService: PatientService,
    private route: ActivatedRoute,
    private router: Router
  ){}

  ngOnInit(): void {
    this.form = new FormGroup({
      idPatient: new FormControl(0),
      firstName: new FormControl('', [Validators.required, Validators.minLength(3)]),
      lastName: new FormControl('' , [Validators.required, Validators.minLength(3)]),
      dui: new FormControl('', [Validators.required, Validators.minLength(9)]),
      address: new FormControl(''),
      phone: new FormControl('', [Validators.required, Validators.minLength(8)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      status: new FormControl('', [Validators.required]),

    });

    this.route.params.subscribe( data => {
      this.id = data['id'];
      this.isEdit = data['id'] != null;
      this.initForm();
    });
  }

  initForm(){
    if(this.isEdit){
      this.patientService.findById(this.id).subscribe(data => {
        this.form = new FormGroup({
          idPatient: new FormControl(data.idPatient),
          firstName: new FormControl(data.firstName, [Validators.required, Validators.minLength(3)]),
          lastName: new FormControl(data.lastName, [Validators.required, Validators.minLength(3)]),
          dui: new FormControl(data.dui, [Validators.required, Validators.minLength(9)]),
          address: new FormControl(data.address),
          phone: new FormControl(data.phone, [Validators.required, Validators.minLength(8)]),
          email: new FormControl(data.email, [Validators.required, Validators.email]),
          status: new FormControl(data.status, [Validators.required]),
        });
      });
    }
  }

  operate(){
    if(this.form.invalid){
      return;
    }

    const patient = new Patient();
    patient.idPatient = this.form.value['idPatient'];
    patient.firstName = this.form.value['firstName'];
    patient.lastName = this.form.value['lastName'];
    patient.dui = this.form.value['dui'];
    patient.address = this.form.value['address'];
    patient.phone = this.form.value['phone'];
    patient.email = this.form.value['email'];
    patient.status = this.form.value['status'];

    //Para Interface
    /*const patient: Patient = {
      idPatient: this.form.value['idPatient'],
      firstName: this.form.value['firstName'],
      lastName: this.form.value['lastName'],
      dni: this.form.value['dni'],
      address: this.form.value['address'],
      phone: this.form.value['phone'],
      email: this.form.value['email'],
    }*/

    if(this.isEdit){
      this.patientService.update(patient, this.id).pipe(switchMap( ()=> {
        return this.patientService.findAll();
      }))
     .subscribe(data => {
          //NEXT: ALMACENA LA DATA EN LA VARIABLE
          this.patientService.setPatientChange(data);
          this.patientService.setMessageChange("UPDATED!");
      });
    }else{
      this.patientService.save(patient).pipe(switchMap( ()=> {
        return this.patientService.findAll();
      }))
        .subscribe(data => {
          this.patientService.setPatientChange(data);
          this.patientService.setMessageChange("CREATED!");
        });
    }

    this.router.navigate(['/pages/patient']);
  }

  get f(){
    return this.form.controls;
  }
}
