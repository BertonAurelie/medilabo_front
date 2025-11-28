import { DatePipe } from "@angular/common";

export interface Reportt {
    patient:number;
    note: string;
    dateNote?: string | Date;
    triggers?:number;
}