import {Sing} from "./sing";

export class Patient{
    idPatient:number;
    firstName:string;
    lastName:string;
    dui:string;
    address:string;
    phone:string;
    email:string;
    singList: Sing[];
    status:boolean;
}
