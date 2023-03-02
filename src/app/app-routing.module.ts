import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {PatientComponent} from "./pages/patient/patient.component";
import {ExamComponent} from "./pages/exam/exam.component";
import {SpecialtyComponent} from "./pages/specialty/specialty.component";
import {MedicComponent} from "./pages/medic/medic.component";
import {ConsultComponent} from "./pages/consult/consult.component";
import {ConsultAutocompleteComponent} from "./pages/consult-autocomplete/consult-autocomplete.component";
import {ConsultWizardComponent} from "./pages/consult-wizard/consult-wizard.component";
import {SearchComponent} from "./pages/search/search.component";
import {ReportComponent} from "./pages/report/report.component";

const routes: Routes = [
  { path: 'pages/patient', component: PatientComponent },
  { path: 'pages/specialty',component: SpecialtyComponent},
  { path: 'pages/exam',   component: ExamComponent},
  { path: 'pages/medic', component: MedicComponent},
  { path: 'pages/consult',  component: ConsultComponent},
  { path: 'pages/consult-autocomplete', component: ConsultAutocompleteComponent},
  { path: 'pages/consult-wizard', component: ConsultWizardComponent},
  { path: 'pages/search', component: SearchComponent},
  { path: 'pages/report', component: ReportComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
