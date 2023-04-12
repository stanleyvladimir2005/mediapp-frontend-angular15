import { Injectable } from '@angular/core';
import {GenericService} from "./generic.service";
import {Sing} from "../model/sing";
import {Subject} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class SingService  extends GenericService<Sing>{

  private singChange = new Subject<Sing[]>;
  private messageChange = new Subject<string>;

  constructor(protected override http: HttpClient){
    super(http, `${environment.HOST}/v1/sings`)
  }

  setSingChange(data: Sing[]){
    this.singChange.next(data);
  }

  getSingChange(){
    return this.singChange.asObservable();
  }

  setMessageChange(data: string){
    this.messageChange.next(data);
  }

  getMessageChange(){
    return this.messageChange.asObservable();
  }
}
