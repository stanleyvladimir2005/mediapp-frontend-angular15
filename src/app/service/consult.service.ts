import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { consultListExamDTOI } from '../dto/consultListExamDTOI';
import {FilterConsultDTO} from "../dto/filterConsultDTO";
import {Consult} from "../model/consult";
import {ConsultListExamDTO} from "../dto/consultListExamDTO";

@Injectable({
  providedIn: 'root'
})
export class ConsultService {

  private url: string = `${environment.HOST}/v1/consults`

  constructor(
    private http: HttpClient
  ) { }

  saveTransactional(dto: consultListExamDTOI){
    return this.http.post(this.url, dto);
  }

  searchOthers(dto: FilterConsultDTO){
    return this.http.post<Consult[]>(`${this.url}/search/others`, dto);
  }

  searchByDates(date1: string, date2: string){
     return this.http.get<Consult[]>(`${this.url}/search/date?date1=${date1}&date2=${date2}`)
  }

  getExamsByIdConsult(idConsult: number){
    return this.http.get<ConsultListExamDTO[]>(`${environment.HOST}/v1/consult-exam/${idConsult}`);
  }

  callProcedureOrFunction(){
    return this.http.get<any>(`${this.url}/callProcedure`);
  }

  //pdf
  generateReport(){
    return this.http.get(`${this.url}/generateReport`, { responseType: 'blob'});
  }

  //Files, Image
  saveFile(data: File){
    const formdata: FormData = new FormData();
    formdata.append('file', data);

    return this.http.post(`${this.url}/saveFile`, formdata);
  }

  readFile(id: number){
    return this.http.get(`${this.url}/readFile/${id}`, { responseType: 'blob'});
  }
}
