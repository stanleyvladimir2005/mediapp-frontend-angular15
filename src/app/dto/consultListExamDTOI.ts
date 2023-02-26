import { Consult } from "../model/consult";
import { Exam } from "../model/exam";

export interface consultListExamDTOI{
    consult: Consult;
    listExam: Exam[];
}
