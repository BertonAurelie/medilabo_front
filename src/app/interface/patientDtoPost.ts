export interface PatientDtoPost {
    lastName: string;
    firstName: string;
    birthday: string;
    gender: string;
    address: string;
    zip?: string;
    town?: string;
    phoneNumber: string; 
    email:string;
    password:string;
}