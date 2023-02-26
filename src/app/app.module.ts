import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {HttpClientModule} from "@angular/common/http";
import {MaterialModule} from "./material/material.module";
import { PatientComponent } from './pages/patient/patient.component';
import { MedicComponent } from './pages/medic/medic.component';
import { ExamComponent } from './pages/exam/exam.component';
import { SpecialtyComponent } from './pages/specialty/specialty.component';
import { PatientEditComponent } from './pages/patient/patient-edit/patient-edit.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { MedicDialogComponent } from './pages/medic/medic-dialog/medic-dialog.component';
import { ConsultComponent } from './pages/consult/consult.component';
import { SearchComponent } from './pages/search/search.component';
import { ConsultWizardComponent } from './pages/consult-wizard/consult-wizard.component';
import { ConsultAutocompleteComponent } from './pages/consult-autocomplete/consult-autocomplete.component';
import { SearchDialogComponent } from './pages/search/search-dialog/search-dialog.component';
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {MatStepperModule} from "@angular/material/stepper";
import {MatCardModule} from "@angular/material/card";
import {MatGridListModule} from "@angular/material/grid-list";
import {MatTabsModule} from "@angular/material/tabs";
import { ReportComponent } from './pages/report/report.component';
import {PdfViewerModule} from "ng2-pdf-viewer";

@NgModule({
  declarations: [
    AppComponent,
    PatientComponent,
    MedicComponent,
    ExamComponent,
    SpecialtyComponent,
    PatientEditComponent,
    MedicDialogComponent,
    ConsultComponent,
    SearchComponent,
    ConsultWizardComponent,
    ConsultAutocompleteComponent,
    SearchDialogComponent,
    ReportComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        HttpClientModule,
        MaterialModule,
        ReactiveFormsModule,
        FormsModule,
        MatAutocompleteModule,
        MatStepperModule,
        MatCardModule,
        MatGridListModule,
        MatTabsModule,
        PdfViewerModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
